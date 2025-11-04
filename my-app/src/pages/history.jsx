import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import Sidebar from "../component/Sidebar";
import { format } from "date-fns";

function History() {
  const [items, setItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const token = localStorage.getItem("userInside");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const d = res.data;
        setItems(Array.isArray(d) ? d : d.history || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <>
      <Navbar
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        isSidebarOpen={sidebarOpen}
      />
      <Sidebar isOpen={sidebarOpen} />

      {/* Background + spacing */}
      <div
        className={`min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 pt-24 pb-10 px-4 flex justify-center transition-all duration-300 ${
          sidebarOpen ? "pl-60" : "pl-4"
        }`}
      >
        {/* Glassy card */}
        <div className="w-full max-w-5xl bg-slate-800/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Saved Chat History
          </h1>
          <p className="mb-8 text-gray-300">
            Review all your past conversations with the AI assistant.
          </p>

          {/* Chat list */}
          {items.length === 0 ? (
            <p className="text-gray-300">
              No saved chats yet. Messages appear here once saved.
            </p>
          ) : (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {items.map((h) => (
                <div
                  key={h._id}
                  className="bg-slate-700/40 border border-white/10 rounded-2xl p-5 text-white shadow-lg"
                >
                  <div className="text-xs text-gray-400 mb-2">
                    {format(new Date(h.createdAt), "yyyy-MM-dd HH:mm")}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-indigo-300 mb-1">You:</p>
                      <p className="text-gray-100 break-words">{h.message}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-purple-300 mb-1">Bot:</p>
                      <p className="text-gray-200 break-words">{h.reply}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default History;
