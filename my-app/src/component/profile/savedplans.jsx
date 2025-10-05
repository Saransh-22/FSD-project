import React from "react";

const mockPlans = [
  { title: "Grade 8 History - Civil War Unit", date: "2025-09-20" },
  { title: "Grade 3 Math - Multiplication Intro", date: "2025-09-18" },
  { title: "Grade 5 Science - Weather Systems", date: "2025-09-15" },
];

function SavedPlans() {
  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 shadow-lg shadow-purple-500/20 text-white">
      <div className="font-semibold text-lg mb-4">Saved Lesson Plans</div>
      <div className="flex flex-col gap-3">
        {mockPlans.map((plan, idx) => (
          <div
            key={idx}
            className="border border-purple-400/20 rounded-lg p-3 bg-slate-800/60 hover:bg-slate-800/80 transition-colors"
          >
            <div className="font-medium">{plan.title}</div>
            <div className="text-xs text-gray-400">
              Last edited: {plan.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPlans;
