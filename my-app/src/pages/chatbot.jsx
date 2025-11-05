import React, { useState, useRef, useEffect } from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const savedChat = sessionStorage.getItem("sessionChat");
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat);
        if (Array.isArray(parsed)) setMessages(parsed);
        console.debug("[Chat] Restored chat with", parsed.length, "messages");
      } catch (e) {
        console.error("Error parsing chat history:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("userInside");
    if (!token) {
      sessionStorage.removeItem("sessionChat");
      setMessages([]);
      console.debug("[Chat] Cleared sessionChat on logout");
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    sessionStorage.setItem("sessionChat", JSON.stringify(newMessages));
    setInput("");

    try {
      const token = localStorage.getItem("userInside");
      if (!token) {
        toast.warning("Please log in to use the chatbot.", { theme: "colored" });
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/chat",
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botMsg = { sender: "bot", text: res.data.reply };
      const updated = [...newMessages, botMsg];
      setMessages(updated);
      sessionStorage.setItem("sessionChat", JSON.stringify(updated));
      console.debug("[Chat] Saved sessionChat, count:", updated.length);
    } catch (err) {
      console.error(err);
      const errMsg = { sender: "bot", text: "⚠️ Error connecting to chatbot." };
      const updated = [...newMessages, errMsg];
      setMessages(updated);
      sessionStorage.setItem("sessionChat", JSON.stringify(updated));
      toast.error("Failed to connect to chatbot.", { theme: "colored" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSaveChat = async (index) => {
    try {
      const token = localStorage.getItem("userInside");
      if (!token) {
        toast.warning("Please log in to save chats.", { theme: "colored" });
        return;
      }

      const botMsg = messages[index];
      const userMsg = [...messages].slice(0, index).reverse().find((m) => m.sender === "user");

      if (!botMsg || !userMsg) {
        toast.error("No valid message pair to save.", { theme: "colored" });
        return;
      }

      await axios.post(
        "http://localhost:5000/api/chat/save",
        { message: userMsg.text, reply: botMsg.text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("💾 Chat saved successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        style: {
          background: "linear-gradient(to right, #6366f1, #8b5cf6)",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        },
      });
    } catch (err) {
      console.error("Error saving chat:", err);
      toast.error("❌ Failed to save chat.", {
        position: "bottom-right",
        theme: "colored",
        style: {
          background: "linear-gradient(to right, #ef4444, #dc2626)",
          color: "white",
          borderRadius: "10px",
        },
      });
    }
  };

  return (
    <>
      <Navbar
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
        isSidebarOpen={sidebarOpen}
      />
      <Sidebar isOpen={sidebarOpen} />

      <div
        className={`fixed inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 pt-20 pb-4 px-4 flex justify-center transition-all duration-300 ${sidebarOpen ? "pl-60" : "pl-4"
          }`}
      >
        <div className="w-full max-w-5xl bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-6 flex flex-col overflow-hidden">
          {/* Header */}
          <h2 className="text-3xl font-bold text-white mb-1">Lesson Plan Chatbot</h2>
          <p className="mb-4 text-gray-300 text-sm">
            Get instant AI-powered help for lesson plan compliance, creation, and improvement.
          </p>

          {/* Chat Messages */}
          <div className="flex-1 bg-slate-800/60 rounded-2xl border border-slate-700 shadow-inner p-4 mb-4 overflow-hidden flex flex-col">
            <div
              ref={chatContainerRef}
              className="chat-scroll-area flex-1 overflow-y-auto overflow-x-hidden pr-2 break-words"
              style={{
                maxHeight: "60vh",
                borderRadius: "1rem",
                paddingRight: "0.5rem",
              }}
            >
              {messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-gray-300 text-center">
                  <div className="text-5xl mb-3 animate-bounce">👋</div>
                  <p className="text-lg font-medium">
                    Start chatting! Ask about <span className="text-indigo-400">lesson plans</span>,{" "}
                    <span className="text-purple-300">subjects</span>, or{" "}
                    <span className="text-blue-300">teaching ideas</span>.
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`max-w-[75%] break-words whitespace-pre-wrap overflow-hidden px-4 py-2 rounded-2xl shadow-md transition-all duration-200 ${msg.sender === "user"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                    >
                      {msg.sender === "bot" && (
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-sm text-indigo-700">🤖 LessonBot</span>
                          <button
                            className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-md shadow-md transition-all"
                            onClick={() => handleSaveChat(i)}
                          >
                            💾 Save
                          </button>
                        </div>
                      )}
                      <div className="break-words whitespace-pre-wrap overflow-x-hidden">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2">
            <textarea
              ref={inputRef}
              rows={1}
              className="flex-1 resize-none border border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80 placeholder-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question and press Enter..."
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-md transition-all"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </>
  );
}
