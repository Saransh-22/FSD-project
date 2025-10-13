import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);

      // Save JWT and user info if provided
      if (res.data?.token) {
        localStorage.setItem("userInside", res.data.token);
      }
      if (res.data?.user) {
        localStorage.setItem("currentuser", JSON.stringify(res.data.user));
      }

      // Provide feedback and navigate
      // alert(res.data?.message || "Signup successful!");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-slate-800/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Section - Signup Form */}
          <div className="bg-slate-900/95 p-8 md:p-12 relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">📘</span>
              </div>
              <div className="bg-slate-800 px-4 py-2 rounded-lg">
                <span className="text-white text-sm font-medium">AI Lesson Plan Compliance Checker</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400 mb-8">Sign up to get started with the AI Lesson Plan Compliance Checker 🚀</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 py-3 px-1 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 py-3 px-1 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />
              <input
                type="text"
                placeholder="Role (optional)"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 py-3 px-1 focus:border-purple-500 focus:outline-none transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-500 py-3 px-1 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-full transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/50"
              >
                Sign Up
              </button>

              {/* Route to Login */}
              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                  Login here
                </Link>
              </p>
            </form>
          </div>

          {/* Right Section - Image */}
          <div className="hidden md:block bg-slate-800/50 min-h-[600px] relative">
            <img
              src="https://media.istockphoto.com/id/1341547247/photo/clipboard-with-green-check-marks-isolated-on-white-background.webp?s=612x612&w=is&k=20&c=70REt5nB_gz9jdVAFwb9U11jEEo55Pn-9En3KVa1PMo="
              alt="AI Lesson Plan Compliance Checker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
