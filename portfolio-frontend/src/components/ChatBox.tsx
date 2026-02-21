import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/chatApi";
import "../styles/chat.css";

type Message = {
  role: "user" | "ai";
  text: string;
  id: number;
};

const SUGGESTIONS = [
  "Can you give me your LeetCode profile?",
  "Tell me about your projects",
  "What skills do you have?",
  "What is your highest education qualification?",
  "Can you give me your LinkedIn profile?",
  "How can I contact you?",
  "What technologies do you work with?",
];

// ─── Markdown renderer ───────────────────────────────────────────────────────
function renderMarkdown(raw: string): string {
  let t = raw;

  // ── 1. Extract and protect links BEFORE any escaping or regex ──
  const linkPlaceholders: string[] = [];

  // Markdown links [text](url)
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_match, label, url) => {
    const idx = linkPlaceholders.length;
    linkPlaceholders.push(
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${label}</a>`
    );
    return `%%LINK_${idx}%%`;
  });

  // Raw URLs (not already inside a placeholder)
  t = t.replace(/(^|[\s])(https?:\/\/[^\s<]+)/g, (_match, pre, url) => {
    const idx = linkPlaceholders.length;
    linkPlaceholders.push(
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${url}</a>`
    );
    return `${pre}%%LINK_${idx}%%`;
  });

  // ── 2. Escape HTML special chars (won't touch placeholders) ──
  t = t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // ── 3. Headings ──
  t = t.replace(/^### (.+)$/gm, "<h3 class='md-h3'>$1</h3>");
  t = t.replace(/^## (.+)$/gm,  "<h2 class='md-h2'>$1</h2>");
  t = t.replace(/^# (.+)$/gm,   "<h1 class='md-h1'>$1</h1>");

  // ── 4. Bold (must come before italic) ──
  t = t.replace(/\*\*(.+?)\*\*/gs, "<strong>$1</strong>");
  t = t.replace(/__(.+?)__/gs,     "<strong>$1</strong>");

  // ── 5. Italic — only single * (NOT underscore, avoids URL breakage) ──
  t = t.replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");

  // ── 6. Inline code ──
  t = t.replace(/`([^`\n]+)`/g, "<code class='inline-code'>$1</code>");

  // ── 7. Blockquote ──
  t = t.replace(/^&gt;\s+(.+)$/gm, "<blockquote class='md-blockquote'>$1</blockquote>");

  // ── 8. HR ──
  t = t.replace(/^---$/gm, "<hr class='md-hr'/>");

  // ── 9. Bullet lists (– or - or *) ──
  t = t.replace(/^[–-]\s+(.+)$/gm, "<li>$1</li>");
  t = t.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul class='md-ul'>$1</ul>");

  // ── 10. Numbered lists ──
  t = t.replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>");
  t = t.replace(/((?:<li>.*<\/li>\n?)+)/g, (m) =>
    m.startsWith("<ul") ? m : `<ol class='md-ol'>${m}</ol>`
  );

  // ── 11. Restore link placeholders ──
  t = t.replace(/%%LINK_(\d+)%%/g, (_match, idx) => linkPlaceholders[Number(idx)]);

  // ── 12. Line breaks ──
  t = t.replace(/\n\n+/g, "<br/><br/>");
  t = t.replace(/\n/g, "<br/>");

  return t;
}

function MarkdownBubble({ text }: { text: string }) {
  return (
    <div
      className="md-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
    />
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgId, setMsgId] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text?: string) => {
    const msgText = text ?? input;
    if (!msgText.trim()) return;

    setInput("");
    setShowSuggestions(false);

    const id = msgId;
    setMsgId((prev) => prev + 2);
    setMessages((prev) => [...prev, { role: "user", text: msgText, id }]);
    setLoading(true);

    try {
      const reply = await sendMessage(msgText);
      setMessages((prev) => [...prev, { role: "ai", text: reply, id: id + 1 }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again.", id: id + 1 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-root">
      <div className="page-bg" />

      <div className="card">
        {/* ── Header ── */}
        <header className="card-header">
          <div className="header-left">
            {/* <div className="menu-icon">
              <span />
              <span />
              <span className="short" />
            </div> */}
            <span className="brand-name">Hi, I’m Yogesh’s AI Assistant</span>
          </div>
          {/* <button className="dots-btn" aria-label="More options">
            <span /><span /><span />
          </button> */}
        </header>

        {/* ── Body ── */}
        <div className="card-body">
          {showSuggestions && messages.length === 0 ? (
            <div className="trending-view">
              <p className="trending-label">Ask me about Yogesh</p>
              <div className="trending-list">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    className="trending-pill"
                    onClick={() => handleSend(s)}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-area">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-row ${msg.role}`}>
                  {msg.role === "ai" && (
                    <div className="ai-orb small" aria-hidden="true" />
                  )}
                  <div className={`bubble ${msg.role}`}>
                    {msg.role === "ai"
                      ? <MarkdownBubble text={msg.text} />
                      : msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row ai">
                  <div className="ai-orb small" aria-hidden="true" />
                  <div className="bubble ai typing-bubble">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* ── Input bar ── */}
        <div className="input-bar">
          <input
            ref={inputRef}
            className="bar-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
            placeholder="How else can I help"
            disabled={loading}
          />
          <div className="bar-actions">
            <button
              className="orb-btn"
              onClick={() => handleSend()}
              disabled={loading}
              aria-label="Send"
            >
              <div className="orb-inner" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}