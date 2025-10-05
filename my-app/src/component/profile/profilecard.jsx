import React from "react";

const mockStats = {
  compliance: 92,
  plansChecked: 128,
  flaggedIssues: 14,
  resolvedIssues: 10,
};

function ProfileCard({ user }) {
  if (!user) return <p className="text-gray-300">Loading profile...</p>;

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-purple-500/20">
      <img
        src={user.avatar}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border-2 border-purple-500 shadow-md"
      />
      <div className="flex-1">
        <div className="font-bold text-lg text-white">{user.name}</div>
        <div className="text-gray-400">{user.email}</div>
        <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-xs font-semibold shadow-md">
          {user.role}
        </span>
      </div>
      <div className="flex gap-6 mt-4 md:mt-0 text-white">
        <div className="text-center">
          <div className="font-bold text-xl text-purple-400">
            {mockStats.compliance}%
          </div>
          <div className="text-xs text-gray-400">
            Avg. Compliance<br />Last 30 days
          </div>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl text-purple-400">
            {mockStats.plansChecked}
          </div>
          <div className="text-xs text-gray-400">
            Plans Checked<br />This year
          </div>
        </div>
        <div className="text-center">
          <div className="font-bold text-xl text-purple-400">
            {mockStats.flaggedIssues}
          </div>
          <div className="text-xs text-gray-400">
            Flagged Issues<br />Resolved {mockStats.resolvedIssues}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
