import { useState } from 'react';
import { X, Send } from 'lucide-react';
import '../style/ChatbotPanel_Style.css';

export default function ChatbotPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Halo! Ada yang bisa saya bantu mengenai aplikasi Anda?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages([...messages, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg = {
        id: messages.length + 2,
        text: 'Terima kasih atas pertanyaannya. Bagaimana saya bisa membantu lebih lanjut?',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
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
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="chatbot-send-btn" onClick={handleSend}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
