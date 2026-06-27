import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaTimes, FaPaperPlane, FaSync } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const ChatbotFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Halo, saya CORA, AI Assistant Exaque. Ada yang bisa saya bantu mengenai solusi Customer Journey Management?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleResetChat = () => {
    setMessages([
      {
        role: "model",
        text: "Halo, saya CORA, AI Assistant Exaque. Ada yang bisa saya bantu mengenai solusi Customer Journey Management?",
      },
    ]);
    setInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((msg, index) => !(index === 0 && msg.role === "model"))
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

      const apiBase = import.meta.env.VITE_API_BASE_URL || "/api/v1";
      const response = await axios.post(`${apiBase}/chat`, {
        history,
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { role: "model", text: response.data.reply },
      ]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Maaf, saat ini layanan sedang sibuk. Coba lagi nanti." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (text) => {
    setInput(text);
  };

  const suggestions = [
    "Manajemen Antrean",
    "Kios Layanan Mandiri",
    "Pesan Otomatis",
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-24 right-6 bg-accent text-white w-14 h-14 rounded-full shadow-lg flex justify-center items-center hover:bg-accent-hover transition z-50 ${isOpen ? 'hidden' : ''}`}
        aria-label="Tanya CORA"
      >
        <FaRobot className="w-8 h-8" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-accent p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FaRobot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">CORA</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span> Asisten Virtual
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleResetChat} className="text-white hover:text-gray-200" title="Mulai Ulang Percakapan">
                <FaSync className="w-4 h-4 mt-0.5" />
              </button>
              <button onClick={toggleChat} className="text-white hover:text-gray-200" title="Tutup">
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-subtle-light flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
              >
                {msg.role !== "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <FaRobot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm ${msg.role === "user"
                      ? "bg-accent text-white rounded-br-none whitespace-pre-wrap"
                      : "bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none chatbot-markdown"
                    }`}
                >
                  {msg.role === "user" ? (
                    msg.text
                  ) : (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <FaRobot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm rounded-bl-none flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white flex gap-2 overflow-x-auto no-scrollbar">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(suggestion)}
                  className="whitespace-nowrap px-3 py-1.5 bg-accent-light text-accent text-xs rounded-full border border-accent hover:bg-accent/20 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya CORA..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-accent text-white flex justify-center items-center hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FaPaperPlane className="w-4 h-4 ml-[-2px]" />
              </button>
            </form>
            <div className="text-center mt-2 text-[10px] text-txt-subtle">
              CORA - Exaque AI Assistant · exaque.com
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotFloating;
