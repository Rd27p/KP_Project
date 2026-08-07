import { useState } from "react";
import { X, Send } from "lucide-react";
import "../style/ChatbotPanel_Style.css";

export default function ChatbotPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! Ada yang bisa saya bantu mengenai aplikasi Anda?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma4:12b",
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
          stream: false,
        }),
      });

      const data = await response.json();

      const botMsg = {
        id: Date.now() + 1,
        text: data.message.content,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Tidak dapat terhubung dengan AI.",
          sender: "bot",
        },
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-panel">
        <div className="chatbot-header">
          <h3>Tanya AI Assistant</h3>
          <button className="chatbot-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
              <div className="chatbot-bubble">{msg.text}</div>
            </div>
          ))}
        </div>

        <div className="chatbot-input-area">
          <input
            type="text"
            placeholder="Tanya sesuatu..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="chatbot-send-btn" onClick={handleSend}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
