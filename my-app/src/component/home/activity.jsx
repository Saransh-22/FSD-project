import React from "react";

function Activity(){
    return(
        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Check Lesson Plans</h2>
              <p className="text-gray-300">
                Upload or review lesson plans and let AI analyze compliance with standards.
              </p>
              <button className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium">
                Upload Plan
              </button>
            </div>

            <div className="bg-slate-700/50 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Compliance Dashboard</h2>
              <p className="text-gray-300">
                Monitor AI-generated compliance scores and flagged issues for your plans.
              </p>
              <button className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium">
                View Dashboard
              </button>
            </div>

            <div className="bg-slate-700/50 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-white mb-2">AI Insights</h2>
              <p className="text-gray-300">
                Get AI suggestions to improve lesson plan quality and ensure compliance.
              </p>
              <button className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium">
                Explore Insights
              </button>
            </div>
          </div>
    );
}

export default Activity;