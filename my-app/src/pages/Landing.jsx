import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Lesson Plan Compliance Checker</h1>
      <p className="text-lg mb-10 max-w-xl text-center">
        AI-enabled tool to check lesson plans against compliance standards.  
        Start by logging in or signing up to explore the features.
      </p>

      <div className="flex space-x-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
