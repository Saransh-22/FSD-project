import React from "react";

const mockRecent = [
  { title: "Grade 4 Science - Ecosystems", date: "2025-09-28", percent: 96, label: "Compliant", labelColor: "bg-green-600", color: "bg-green-500" },
  { title: "Grade 6 Math - Fractions Review", date: "2025-09-26", percent: 82, label: "Needs Review", labelColor: "bg-red-500", color: "bg-red-400" },
  { title: "Grade 2 Literacy - Phonics", date: "2025-09-22", percent: 94, label: "Compliant", labelColor: "bg-green-600", color: "bg-green-500" },
];

function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="font-semibold mb-4">Recent Compliance Activity</div>
      <div className="flex flex-col gap-4">
        {mockRecent.map((item, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-1">
              <div className="font-medium">{item.title}</div>
              <span className={`text-xs px-2 py-1 rounded-full text-white ${item.labelColor}`}>
                {item.label}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
              <span>Checked on {item.date}</span>
              <span className="font-bold">{item.percent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div className={`${item.color} h-2 rounded`} style={{ width: `${item.percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
