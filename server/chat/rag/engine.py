import os
import requests
from dotenv import load_dotenv
from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

# ================== PATH SETUP ==================
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

DB_PATH = BASE_DIR / "database"
PDF_PATH = BASE_DIR / "resume.pdf"

# ================== EMBEDDINGS ==================
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ================== BUILD DATABASE ==================
def build_db():
    """
    Builds vector database only if not exists
    """
    if DB_PATH.exists():
        return

    print("🔨 Building vector database...")

    loader = PyPDFLoader(str(PDF_PATH))
    docs = loader.load()

    # Better semantic chunking
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=900,
        chunk_overlap=200,
        separators=["\n\n", "\n", ".", " "]
    )

    chunks = splitter.split_documents(docs)

    Chroma.from_documents(
        chunks,
        embedding_model,
        persist_directory=str(DB_PATH)
    )

    print("✅ Vector DB Ready")


# ================== QUERY REWRITER ==================
def rewrite_query(q: str) -> str:
    q = q.lower()

    # ---- CONTACT / LINKS ----
    contact_words = [
        "contact", "email", "phone", "reach", "connect",
        "linkedin", "github", "profile", "portfolio",
        "social", "how can i contact", "how to contact"
    ]
    if any(w in q for w in contact_words):
        return "contact information email phone linkedin github profiles links"

    # ---- PROJECTS ----
    if any(w in q for w in ["project", "build", "made", "developed", "work"]):
        return "projects portfolio project details technologies"

    # ---- SKILLS ----
    if any(w in q for w in ["skills", "tech stack", "technology", "languages"]):
        return "technical skills programming languages frameworks tools"

    # ---- EDUCATION ----
    if any(w in q for w in ["college", "education", "study", "degree", "university"]):
        return "education academic background institute degree"

    # ---- EXPERIENCE ----
    if any(w in q for w in ["experience", "internship", "work experience"]):
        return "experience roles responsibilities work history"

    return q
# ================== CONTEXT SEARCH ==================
def search_context(query):
    build_db()

    query = rewrite_query(query)

    db = Chroma(
        persist_directory=str(DB_PATH),
        embedding_function=embedding_model
    )

    # MMR search -> diverse relevant chunks
    docs = db.max_marginal_relevance_search(query, k=6, fetch_k=20)

    context = "\n\n".join([d.page_content for d in docs])

    # prevent sending too many tokens
    return context[:3500]


# ================== ASK AI ==================
def ask_ai(question, context):
    prompt = f"""
You are an AI portfolio assistant representing Yogesh Rathia.

STRICT RULES:
- Only use provided resume data
- NEVER modify usernames, emails, IDs, or links
- ALWAYS copy links EXACTLY character-by-character
- Do NOT shorten, clean, or reformat URLs
- If asked for profile/link → return the exact link
- If missing → say: Not mentioned in resume

Style:
- Conversational but precise
- No assumptions
- No guessing

RESUME:
----------------
{context}
----------------

Question: {question}
Answer:
"""

    try:
        res = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct",
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.3
            },
            timeout=60
        )

        data = res.json()

        if "choices" not in data:
            return f"OpenRouter Error: {data}"

        return data["choices"][0]["message"]["content"]

    except Exception as e:
        return f"AI Error: {str(e)}"