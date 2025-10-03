import React from "react";

const mockStats = {
  compliance: 92,
  plansChecked: 128,
  flaggedIssues: 14,
  resolvedIssues: 10,
};

function ProfileCard({ user }) {
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
      <img
        src={user.avatar}
        alt="avatar"
        className="w-20 h-20 rounded-full object-cover border-2 border-[#2A9D8F]"
      />
      <div className="flex-1">
        <div className="font-bold text-lg">{user.name}</div>
        <div className="text-gray-500">{user.email}</div>
        <span className="inline-block mt-2 px-3 py-1 bg-[#2A9D8F] text-white rounded-full text-xs">
          {user.role}
        </span>
      </div>
      <div className="flex gap-6 mt-4 md:mt-0">
        <div className="text-center">
          <div className="font-bold text-xl">{mockStats.compliance}%</div>
          <div className="text-xs text-gray-500">Avg. Compliance<br />Last 30 days</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl">{mockStats.plansChecked}</div>
          <div className="text-xs text-gray-500">Plans Checked<br />This school year</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl">{mockStats.flaggedIssues}</div>
          <div className="text-xs text-gray-500">
            Flagged Issues<br />Resolved {mockStats.resolvedIssues}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
