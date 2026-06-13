import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLink = (path, label) => (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `text-sm px-3 py-2 rounded-lg transition ${
          isActive
            ? "text-white bg-white/10"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`
      }
      onClick={() => setMobileOpen(false)}
    >
      {label}
    </NavLink>
  );

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4">
        {/* LOGO */}
        <NavLink to="/" className="text-lg font-semibold hover:opacity-80 transition">
          ⚡ ShiftShield
        </NavLink>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden text-gray-400 hover:text-white p-2 text-xl"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        {/* NAV LINKS — desktop */}
        <div className="hidden md:flex gap-1 items-center">
          {user?.role === "worker" && (
            <>
              {navLink("/dashboard", "Dashboard")}
              {navLink("/policy", "Policy")}
              {navLink("/claims", "Claims")}
            </>
          )}
          {user?.role === "admin" && navLink("/admin", "Admin Panel")}
        </div>

        {/* RIGHT — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user && (
            <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
              {user.role?.toUpperCase()}
            </span>
          )}
          {user ? (
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="text-sm px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-2 bg-[#0B0F19]">
          {user?.role === "worker" && (
            <>
              {navLink("/dashboard", "Dashboard")}
              {navLink("/policy", "Policy")}
              {navLink("/claims", "Claims")}
            </>
          )}
          {user?.role === "admin" && navLink("/admin", "Admin Panel")}
          {user ? (
            <button
              onClick={() => { logout(); navigate("/login"); setMobileOpen(false); }}
              className="text-sm px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-left mt-1"
            >
              Logout ({user.role})
            </button>
          ) : (
            <button
              onClick={() => { navigate("/login"); setMobileOpen(false); }}
              className="text-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-left mt-1"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;