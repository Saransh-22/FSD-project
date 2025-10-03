import React from "react";

const mockPlans = [
  { title: "Grade 8 History - Civil War Unit", date: "2025-09-20" },
  { title: "Grade 3 Math - Multiplication Intro", date: "2025-09-18" },
  { title: "Grade 5 Science - Weather Systems", date: "2025-09-15" },
];

function SavedPlans() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="font-semibold mb-4">Saved Lesson Plans</div>
      <div className="flex flex-col gap-3">
        {mockPlans.map((plan, idx) => (
          <div key={idx} className="border rounded-lg p-3 flex flex-col gap-2">
            <div className="font-medium">{plan.title}</div>
            <div className="text-xs text-gray-500">Last edited: {plan.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPlans;
