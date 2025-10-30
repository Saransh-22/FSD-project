import { Link } from "react-router-dom";
import Hero from "../component/landing/hero";
import Features from "../component/landing/feature";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-slate-800/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-8 text-center flex flex-col items-center">
          {/* Header / Logo Section */}
          <div className="flex items-center gap-3 mb-0">
            <div
              className="flex items-center gap-2 font-bold text-3xl tracking-wide"
            >
              <span className="text-purple-400 text-4xl drop-shadow-lg">⚡</span>
              <span className="text-white drop-shadow-md">PlanIntellect</span>
            </div>
          </div>

          <Hero />

          <div className="h-[1px] w-full bg-gray-700/40 my-8"></div>

          <Features />

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 shadow-lg shadow-purple-500/50 transform transition-all hover:scale-[1.02]"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-purple-400 text-white font-semibold px-8 hover:bg-purple-500/20 transition-all transform hover:scale-[1.02]"
            >
              Sign Up
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-6">
            Simplify your teaching compliance with AI-powered insights ✨
          </p>
        </div>
      </div>
    </div>
  );
}