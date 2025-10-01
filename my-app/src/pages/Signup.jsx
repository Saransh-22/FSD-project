import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        <input type="text" name="username" placeholder="Username"
          onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        
        <input type="email" name="email" placeholder="Email"
          onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        
        <input type="password" name="password" placeholder="Password"
          onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    </div>
  );
}
