import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Activity() {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("userInside"); // ✅ Get stored JWT token

    try {
      setUploading(true);
      setMessage("");

      // ✅ Added Authorization header instead of withCredentials
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,  // ✅ send JWT token here
        },
      });

      setMessage(`✅ ${res.data.message || "File uploaded successfully!"}`);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Upload Section */}
      <div className="bg-slate-700/50 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Check Lesson Plans</h2>
        <p className="text-gray-300">
          Upload or review lesson plans and let AI analyze compliance with standards.
        </p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
        >
          {uploading ? "Uploading..." : "Upload Plan"}
        </button>

        {message && <p className="text-sm text-gray-300 mt-2">{message}</p>}
      </div>

      {/* Dashboard */}
      <div className="bg-slate-700/50 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Compliance Dashboard</h2>
        <p className="text-gray-300">
          Monitor AI-generated compliance scores and flagged issues for your plans.
        </p>
        <Link
          to="/profile"
          className="mt-4 inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
        >
          View Dashboard
        </Link>
      </div>

      {/* Insights */}
      <div className="bg-slate-700/50 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-white mb-2">AI Insights</h2>
        <p className="text-gray-300">
          Get AI suggestions to improve lesson plan quality and ensure compliance.
        </p>
        <Link
          to="/chatbot"
          className="mt-4 inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
        >
          Explore Insights
        </Link>
      </div>
    </div>
  );
}

export default Activity;
