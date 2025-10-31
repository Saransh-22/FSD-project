import React, { useState, useRef, useEffect } from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        user_input: input,
        detail_mode: "concise",
      });

      const botMsg = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to chatbot." },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Navbar
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
        isSidebarOpen={sidebarOpen}
      />
      <Sidebar isOpen={sidebarOpen} />

      {/* Gradient background container */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 pt-24 pb-10 px-4 flex justify-center transition-all duration-300 ${
          sidebarOpen ? "pl-60" : "pl-4"
        }`}
      >
        <div className="w-full max-w-5xl bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col overflow-hidden">
          {/* Header */}
          <h2 className="text-3xl font-bold text-white mb-1">
            Lesson Plan Chatbot
          </h2>
          <p className="mb-4 text-gray-300 text-sm">
            Get instant AI-powered help for lesson plan compliance,
            creation, and improvement.
          </p>

          {/* Chat section */}
          <div className="flex-1 bg-slate-800/60 rounded-2xl border border-slate-700 shadow-inner p-4 mb-4 overflow-hidden flex flex-col">
            <div
              ref={chatContainerRef}
              className="chat-scroll-area flex-1 overflow-y-auto pr-2"
              style={{
                maxHeight: "60vh",
                borderRadius: "1rem",
                paddingRight: "0.5rem",
              }}
            >
              {messages.length === 0 ? (
                <div className="text-gray-400 text-center mt-20">
                  👋 Start chatting! Ask about lesson plans, subjects, or
                  teaching ideas.
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex mb-4 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md transition-all duration-200 ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.sender === "bot" && (
                        <div className="font-semibold text-sm text-indigo-700 mb-1">
                          🤖 LessonBot
                        </div>
                      )}
                      <div className="prose max-w-none">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2 items-center">
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
    </>
  );
}
