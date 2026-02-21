import { useState } from "react";
import { sendMessage } from "../services/chatApi";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const reply = await sendMessage(input);

    const aiMsg: Message = { role: "ai", text: reply };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "user" : "ai"}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="ai">Thinking...</div>}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my experience, skills, projects..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}