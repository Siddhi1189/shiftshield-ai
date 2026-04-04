import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const link = (path, label) => {
    const active = location.pathname === path;

    return (
      <button
        onClick={() => navigate(path)}
        className={`text-sm px-3 py-2 rounded-lg transition
          ${active
            ? "text-white bg-white/10"
            : "text-gray-400 hover:text-white"
          }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-white/10 bg-[#0B0F19]">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-lg font-semibold cursor-pointer"
      >
        ShiftShield
      </h1>

      {/* NAV LINKS */}
      <div className="flex gap-2">

        {user === "worker" && (
            <>
            {link("/dashboard", "Dashboard")}
            {link("/policy", "Policy")}
            {link("/claims", "Claims")}
            </>
        )}

        {user === "admin" && (
            <>
            {link("/admin", "Admin")}
            </>
        )}

        </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {user && (
          <span className="text-xs text-gray-400">
            {user}
          </span>
        )}

        {user ? (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-sm px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-sm px-3 py-2 bg-blue-500 rounded-lg"
          >
            Login
          </button>
        )}

      </div>

    </div>
  );
}

export default Navbar;