import React from "react";

function Review(){
    return(
        <div className="mt-10 bg-slate-700/50 backdrop-blur-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Recent AI Reviews</h2>
            <ul className="text-gray-300 list-disc list-inside">
              <li>Lesson Plan "Math - Fractions" flagged for missing learning outcomes.</li>
              <li>Lesson Plan "Science - Photosynthesis" compliance score: 95%</li>
              <li>AI suggested improvements for "History - World Wars" lesson plan.</li>
            </ul>
          </div>

    );
}

export default Review;