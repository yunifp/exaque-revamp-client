import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaTimes, FaPaperPlane, FaSync } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import agentImg from "../../assets/agent2.png";
import coraAvatar from "../../assets/cora-avatar.png";

const ChatbotFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatPhase, setChatPhase] = useState("WELCOME");
  const [leadData, setLeadData] = useState({
    nama: "",
    email_kantor: "",
    perusahaan: "",
    sektor: "",
    niat: "",
    halaman_dilihat: typeof window !== "undefined" ? window.location.pathname : "",
    pertanyaan_komersial: false
  });
  
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isManagedServicePage =
    pathname === "/exaque-managed-service" ||
    pathname === "/exaque-managed-branch-performance";

  const getInitialMessages = () => [
    {
      role: "model",
      text: isManagedServicePage
        ? "Halo! Saya CORA, AI Assistant Exaque. Ingin tahu lebih lanjut tentang Exaque Managed Service atau jadwalkan assessment cabang?"
        : "Halo! Saya CORA, AI Assistant Exaque. Mau mulai dari mana?",
      options: isManagedServicePage
        ? ["Tentang Managed Service", "Jadwalkan Assessment Cabang", "Lihat solusi lainnya"]
        : ["Lihat solusi kami", "Exaque Managed Service", "Studi kasus sektor saya", "Jadwalkan demo"]
    },
  ];

  const [messages, setMessages] = useState(getInitialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleResetChat = () => {
    setChatPhase("WELCOME");
    setLeadData({
      nama: "",
      email_kantor: "",
      perusahaan: "",
      sektor: "",
      niat: "",
      halaman_dilihat: typeof window !== "undefined" ? window.location.pathname : "",
      pertanyaan_komersial: false
    });
    setMessages(getInitialMessages());
    setInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, chatPhase]);

  const handleOptionClick = (option) => {
    const newMessages = [...messages, { role: "user", text: option }];
    setMessages(newMessages);

    if (chatPhase === "WELCOME") {
      setLeadData(prev => ({ ...prev, niat: option }));
      if (option === "Studi kasus sektor saya") {
        setChatPhase("DISCOVERY");
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "model",
            text: "Agar saya tunjukkan contoh paling relevan — sektor Anda apa?",
            options: ["Perbankan", "Multifinance", "Telekomunikasi", "Lainnya"]
          }]);
        }, 500);
      } else if (option === "Jadwalkan demo") {
        setChatPhase("CAPTURE");
        setTimeout(() => {
           setMessages(prev => [...prev, {
              role: "model",
              text: "Untuk menjadwalkan demo, saya akan teruskan ke tim Exaque. Boleh minta data Anda?",
              isForm: true
           }]);
        }, 500);
      } else if (option === "Lihat solusi kami") {
        setChatPhase("CAPTURE");
        setTimeout(() => {
           setMessages(prev => [...prev, {
              role: "model",
              text: "Solusi Enterprise Customer Journey Management kami terbukti membantu banyak perusahaan. Mau saya kirim brosur lengkap + opsi jadwal demo ke email kantor Anda?",
              isForm: true
           }]);
        }, 500);
      } else if (option === "Exaque Managed Service" || option === "Tentang Managed Service") {
        setLeadData(prev => ({ ...prev, niat: "Exaque Managed Service" }));
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setMessages(prev => [...prev, {
            role: "model",
            text: "Dengan **Exaque Managed Service**, Anda cukup berlangganan untuk memantau dan mengelola performa layanan setiap cabang aktif tanpa investasi perangkat rumit.\n\n• **Pantau Indikator Harian**: Waktu tunggu, durasi layanan, & deviasi SLA.\n• **Validasi & Rekomendasi**: Menelaah akar masalah operasional bersama PIC cabang & kawal perbaikan.\n• **Dukungan Penuh**: Platform & technical support, business support, dan SLA tertulis.\n\nMau kami bantu jadwalkan **Assessment Cabang** atau kirimkan overview lengkap ke email kantor Anda?",
            isForm: true
          }]);
          setChatPhase("CAPTURE");
        }, 600);
      } else if (option === "Jadwalkan Assessment Cabang") {
        setLeadData(prev => ({ ...prev, niat: "Assessment Cabang Managed Service" }));
        setChatPhase("CAPTURE");
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "model",
            text: "Untuk menjadwalkan **Assessment Cabang** Exaque Managed Service, silakan lengkapi kontak kantor Anda di bawah ini agar tim spesialis kami dapat segera menghubungi Anda.",
            isForm: true
          }]);
        }, 500);
      } else if (option === "Lihat solusi lainnya") {
        setChatPhase("WELCOME");
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "model",
            text: "Exaque menyediakan platform Enterprise Customer Journey Management terintegrasi (Qmatic Orchestra, Antrean Virtual, Mobile Ticket, dll). Mau mulai dari mana?",
            options: ["Lihat solusi kami", "Studi kasus sektor saya", "Jadwalkan demo"]
          }]);
        }, 500);
      }
    } else if (chatPhase === "DISCOVERY") {
      setLeadData(prev => ({ ...prev, sektor: option }));
      setIsLoading(true);
      setTimeout(() => {
         setIsLoading(false);
         let caseStudy = "";
         if(option === "Perbankan") caseStudy = "Standard Chartered berhasil meningkatkan efisiensi cabang dengan solusi antrean cerdas kami.";
         else if(option === "Multifinance") caseStudy = "BCA Finance mengelola antrean pelanggan lebih baik dan mempercepat layanan sejak 2009.";
         else if(option === "Telekomunikasi") caseStudy = "Indosat mengoptimalkan customer journey di ratusan gerai mereka di seluruh Indonesia.";
         else caseStudy = "Kami memiliki berbagai studi kasus implementasi di berbagai industri.";
         
         setMessages(prev => [...prev, {
            role: "model",
            text: `Sebentar, saya carikan contoh yang paling sesuai...\n\n**${option}**: ${caseStudy}\n\nMau saya kirim studi kasus lengkap + opsi jadwal demo ke email kantor Anda?`,
            isForm: true
         }]);
         setChatPhase("CAPTURE");
      }, 1000);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "/api/v1";
      await axios.post(`${apiBase}/lead`, { 
        ...leadData, 
        timestamp: new Date().toISOString() 
      });
      
      setChatPhase("COMPLETED");
      setMessages(prev => [...prev, {
         role: "model",
         text: "Terima kasih! Tim Exaque akan menghubungi Anda segera. Ada lagi yang bisa saya bantu?"
      }]);
    } catch (error) {
       console.error("Lead submission error:", error);
       setMessages(prev => [...prev, {
         role: "model",
         text: "Maaf, ada kendala sesaat. Boleh ulangi, atau saya hubungkan ke tim kami secara manual?"
       }]);
    } finally {
       setIsLoading(false);
    }
  };

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
        .filter(msg => !msg.isForm && !msg.options)
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

      const apiBase = import.meta.env.VITE_API_BASE_URL || "/api/v1";
      const response = await axios.post(`${apiBase}/chat`, {
        history,
        message: userMessage,
      });

      if(response.data.isHandoff) {
         setChatPhase("HANDOFF");
         setLeadData(prev => ({ ...prev, pertanyaan_komersial: true, niat: "Pertanyaan Komersial (Handoff dari text)" }));
         setMessages(prev => [...prev, {
           role: "model",
           text: "Untuk penawaran spesifik, saya hubungkan Anda dengan tim Exaque. Boleh minta kontaknya?",
           isForm: true
         }]);
      } else {
         setMessages((prev) => [
           ...prev,
           { role: "model", text: response.data.reply },
         ]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Maaf, ada kendala sesaat. Coba lagi nanti atau jadwalkan demo." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-0 right-0 w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 flex justify-center items-end hover:scale-105 transition-transform z-50 origin-bottom-right group ${isOpen ? 'hidden' : ''}`}
        aria-label="Tanya CORA"
      >
        {/* Chat Bubble Pointer */}
        <div className="absolute top-4 -left-4 md:top-8 md:-left-2 lg:top-12 lg:left-4 bg-white text-accent font-bold text-xs md:text-sm px-4 py-2 rounded-2xl rounded-br-none shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-gray-100 animate-bounce whitespace-nowrap group-hover:bg-gray-50 transition-colors">
          Tanya CORA 👋
        </div>
        <img src={agentImg} alt="Agent" className="w-full h-full object-contain object-bottom drop-shadow-2xl" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-accent p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white/40 shadow-sm shrink-0">
                <img src={coraAvatar} alt="CORA" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">CORA</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  Customer Orchestration & Response Assistant
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
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img src={coraAvatar} alt="CORA" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm ${msg.role === "user"
                        ? "bg-accent text-white rounded-br-none whitespace-pre-wrap"
                        : "bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none chatbot-markdown"
                      }`}
                  >
                    {msg.role === "user" ? (
                      msg.text
                    ) : (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    )}
                    
                    {/* Form Kualifikasi Lead */}
                    {msg.isForm && (chatPhase === "CAPTURE" || chatPhase === "HANDOFF") && index === messages.map((m, i) => m.isForm ? i : -1).filter(i => i !== -1).pop() && (
                      <form onSubmit={handleLeadSubmit} className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-3">
                        <input
                          type="text"
                          placeholder="Nama Lengkap"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                          value={leadData.nama}
                          onChange={(e) => setLeadData({ ...leadData, nama: e.target.value })}
                          disabled={isLoading}
                        />
                        <input
                          type="email"
                          placeholder="Email Kantor"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                          value={leadData.email_kantor}
                          onChange={(e) => setLeadData({ ...leadData, email_kantor: e.target.value })}
                          disabled={isLoading}
                        />
                        <input
                          type="text"
                          placeholder="Nama Perusahaan"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                          value={leadData.perusahaan}
                          onChange={(e) => setLeadData({ ...leadData, perusahaan: e.target.value })}
                          disabled={isLoading}
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-accent text-white py-2 rounded-md font-medium text-sm hover:bg-accent-hover transition disabled:opacity-70 mt-1"
                        >
                          {isLoading ? "Mengirim..." : "Kirim & Jadwalkan"}
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Quick Replies (Chips) */}
                  {msg.options && index === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(opt)}
                          disabled={isLoading}
                          className="px-3 py-1.5 bg-white text-accent border border-accent rounded-full text-xs hover:bg-accent-light transition"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && !messages[messages.length - 1]?.isForm && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src={coraAvatar} alt="CORA" className="w-full h-full object-cover" />
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

          {/* Input Area (Sekunder) */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan bebas di sini..."
                className="flex-1 px-4 py-2 border border-gray-200 bg-gray-50 rounded-full text-sm focus:outline-none focus:border-accent focus:bg-white transition"
                disabled={isLoading || chatPhase === "CAPTURE" || chatPhase === "HANDOFF"}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || chatPhase === "CAPTURE" || chatPhase === "HANDOFF"}
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
