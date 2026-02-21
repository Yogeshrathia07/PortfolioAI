import os
import requests
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
DB_PATH = "database"
PDF_PATH = "resume.pdf"

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def build_db():
    if os.path.exists(DB_PATH):
        return

    loader = PyPDFLoader(PDF_PATH)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    chunks = splitter.split_documents(docs)

    Chroma.from_documents(chunks, embedding_model, persist_directory=DB_PATH)


def search_context(query):
    db = Chroma(persist_directory=DB_PATH, embedding_function=embedding_model)
    docs = db.similarity_search(query, k=4)
    return "\n\n".join([d.page_content for d in docs])



def ask_ai(question, context):
    prompt = f"""
Answer only using resume information.
If not present say: Not mentioned in resume.

Context:
{context}

Question:
{question}
"""

    res = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "mistralai/mistral-7b-instruct",
            "messages": [{"role": "user", "content": prompt}]
        }
    )

    print("\n================ OPENROUTER DEBUG ================")
    print("STATUS CODE:", res.status_code)
    print("RESPONSE TEXT:", res.text)
    print("=================================================\n")

    try:
        data = res.json()
    except Exception as e:
        return f"Invalid JSON: {res.text}"

    if "choices" not in data:
        return f"OpenRouter Error → {data}"

    return data["choices"][0]["message"]["content"]