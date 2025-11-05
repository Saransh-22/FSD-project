import React, { useEffect, useState } from "react";
import axios from "axios";

function SavedPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("userInside");
        const res = await axios.get("http://localhost:5000/api/upload", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token for protect middleware
          },
        });
        setPlans(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load saved lesson plans ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-900/70 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 text-center text-white">
        Loading lesson plans...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900/70 backdrop-blur-xl border border-red-400/20 rounded-2xl p-6 text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 shadow-lg shadow-purple-500/20 text-white">
      <div className="font-semibold text-lg mb-4">Saved Lesson Plans</div>

      {plans.length === 0 ? (
        <p className="text-gray-400 text-sm">No lesson plans uploaded yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="border border-purple-400/20 rounded-lg p-3 bg-slate-800/60 hover:bg-slate-800/80 transition-colors"
            >
              <div className="font-medium">{plan.originalName}</div>
              <div className="text-xs text-gray-400">
                Uploaded: {new Date(plan.uploadedAt).toLocaleDateString()}
              </div>
              <a
                href={`http://localhost:5000${plan.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 text-sm hover:text-purple-300 mt-1 inline-block"
              >
                📂 View / Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedPlans;
