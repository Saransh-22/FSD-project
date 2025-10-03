import React from "react";

function AccountSettings() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="font-semibold mb-4">Account Settings</div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center justify-between">
          <span>Email notifications</span>
          <input type="checkbox" className="toggle toggle-sm" defaultChecked />
        </label>
        <label className="flex items-center justify-between">
          <span>Auto-check on save</span>
          <input type="checkbox" className="toggle toggle-sm" />
        </label>
        <div>
          <span className="block mb-1">Preferred AI model</span>
          <select className="border rounded px-2 py-1 w-full">
            <option>OpenAI — gpt-5-mini</option>
            <option>OpenAI — gpt-4</option>
            <option>Google Gemini</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
