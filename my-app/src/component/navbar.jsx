import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Navbar() {
  const [isloggedin, setisloggedin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userInside");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        setisloggedin(!isExpired);
        if (isExpired) localStorage.clear(); // auto logout if token expired
      } catch {
        setisloggedin(false);
      }
    } else {
      setisloggedin(false);
    }
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem("userInside");
    localStorage.removeItem("currentuser");
    setisloggedin(false);
    navigate("/");
  };

  if (!isloggedin || (location.pathname !== "/home" && location.pathname !== "/profile")) return null;

  return (
    <nav className="bg-[#2D3E50] px-8 py-4 flex justify-between items-center shadow-md">
      <div className="font-bold font-sans">
        <Link to="/" className="text-[#2A9D8F] no-underline">AAAA</Link>
      </div>
      <div className="flex items-center space-x-4">
        {location.pathname === "/home" && (
          <button onClick={() => navigate("/profile")} className="px-5 py-2 bg-[#2A9D8F] text-white rounded-lg font-bold hover:bg-[#0056b3]">Profile</button>
        )}
        {location.pathname === "/profile" && (
          <button onClick={() => navigate("/home")} className="px-5 py-2 bg-[#2A9D8F] text-white rounded-lg font-bold hover:bg-[#0056b3]">Home</button>
        )}
        <button onClick={handleSignOut} className="px-5 py-2 bg-[#2A9D8F] text-white rounded-lg font-bold hover:bg-[#0056b3]">Sign Out</button>
      </div>
    </nav>
  );
}

export default Navbar;
