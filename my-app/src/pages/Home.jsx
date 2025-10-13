import React, { useState } from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/Sidebar";
import Review from "../component/home/review";
import Activity from "../component/home/activity";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Navbar
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
        isSidebarOpen={sidebarOpen}
      />
      <Sidebar isOpen={sidebarOpen} />
      <div
        className={`min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 pt-24 pb-10 px-4 flex justify-center transition-all duration-300 ${
          sidebarOpen ? "pl-60" : "pl-4"
        }`}
      >
        <div className="w-full max-w-6xl bg-slate-800/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10">
          <h1 className="text-3xl font-bold text-white mb-2">AI-Enabled Lesson Plan Compliance</h1>
          <p className="mb-8 text-gray-300">
            Manage, review, and optimize lesson plans using AI-driven compliance checks.
          </p>
        <Activity/>
        <Review/>
        </div>
      </div>
    </>
  );
}