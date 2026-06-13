import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const link = (path, label) => {
    const active = location.pathname === path;

    return (
      <button
        onClick={() => navigate(path)}
        className={`
          w-full text-left px-4 py-3 rounded-xl transition
          ${active
            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
            : "hover:bg-white/10"
          }
        `}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-64 p-6 bg-black/40 backdrop-blur-xl border-r border-white/10">

      <h1 className="text-xl font-bold mb-10">ShiftShield</h1>

      <div className="space-y-2">
        {link("/dashboard", "Dashboard")}
        {link("/policy", "Policy")}
        {link("/claims", "Claims")}
        {link("/admin", "Admin")}
      </div>

    </div>
  );
}

export default Sidebar;