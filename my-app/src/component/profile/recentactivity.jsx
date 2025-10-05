import React from "react";

const mockRecent = [
  {
    title: "Grade 4 Science - Ecosystems",
    date: "2025-09-28",
    percent: 96,
    label: "Compliant",
    labelColor: "bg-green-600",
    color: "bg-green-500",
  },
  {
    title: "Grade 6 Math - Fractions Review",
    date: "2025-09-26",
    percent: 82,
    label: "Needs Review",
    labelColor: "bg-red-500",
    color: "bg-red-400",
  },
  {
    title: "Grade 2 Literacy - Phonics",
    date: "2025-09-22",
    percent: 94,
    label: "Compliant",
    labelColor: "bg-green-600",
    color: "bg-green-500",
  },
];

function RecentActivity() {
  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 shadow-lg shadow-purple-500/20 text-white">
      <div className="font-semibold text-lg mb-4">Recent Compliance Activity</div>
      <div className="flex flex-col gap-4">
        {mockRecent.map((item, idx) => (
          <div
            key={idx}
            className="border border-purple-400/20 rounded-xl p-4 bg-slate-800/60 hover:bg-slate-800/80 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">{item.title}</div>
              <span
                className={`text-xs px-2 py-1 rounded-full text-white ${item.labelColor} shadow-md`}
              >
                {item.label}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
              <span>Checked on {item.date}</span>
              <span className="font-bold text-purple-300">{item.percent}%</span>
            </div>

            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
