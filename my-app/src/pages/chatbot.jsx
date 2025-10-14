import React, { useState } from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/Sidebar";
import axios from "axios";

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        setMessages([...messages, { sender: "user", text: input }]);
        setInput("");

        try {
            const res = await axios.post("http://localhost:8000/chat", {
                user_input: input,
                detail_mode: "concise", 
            });

            // Add bot response
            setMessages((msgs) => [...msgs, { sender: "bot", text: res.data.reply }]);
        } catch (err) {
            console.error(err);
            setMessages((msgs) => [
                ...msgs,
                { sender: "bot", text: "Error connecting to chatbot." },
            ]);
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
                className={`min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 pt-24 pb-10 px-4 flex justify-center transition-all duration-300 ${sidebarOpen ? "pl-60" : "pl-4"
                    }`}
            >
                <div className="w-full max-w-6xl bg-slate-800/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Lesson Plan Chatbot</h2>
                    <p className="mb-8 text-gray-300">
                        Get instant AI-powered help for lesson plan compliance, suggestions, and review.
                    </p>
                    <div className="mb-6 h-64 overflow-y-auto border rounded p-2 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                <span className={msg.sender === "user" ? "text-blue-600" : "text-green-600"}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 border rounded p-2"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type your question..."
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}