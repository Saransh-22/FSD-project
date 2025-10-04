import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userInside");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        setIsLoggedIn(!isExpired);
        if (isExpired) localStorage.clear(); // auto logout if token expired
      } catch {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem("userInside");
    localStorage.removeItem("currentuser");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Hide navbar on landing/login/signup pages
  if (!isLoggedIn || (location.pathname !== "/home" && location.pathname !== "/profile")) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl border-b border-purple-400/20 shadow-lg shadow-purple-500/10 px-6 md:px-10 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <Link
        to="/home"
        className="flex items-center gap-2 text-white font-bold text-xl tracking-wide hover:text-purple-300 transition-colors"
      >
        <span className="text-purple-400 text-2xl">⚡</span>
        <span>PlanIntellect</span>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        {location.pathname === "/home" && (
          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-full shadow-md shadow-purple-500/30 transition-all transform hover:scale-[1.03]"
          >
            Profile
          </button>
        )}
        {location.pathname === "/profile" && (
          <button
            onClick={() => navigate("/home")}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-full shadow-md shadow-purple-500/30 transition-all transform hover:scale-[1.03]"
          >
            Home
          </button>
        )}
        <button
          onClick={handleSignOut}
          className="px-5 py-2 border border-purple-400 text-white rounded-full font-semibold hover:bg-purple-500/20 transition-all transform hover:scale-[1.03]"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
