import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="
      flex justify-between items-center
      px-6 py-4
      bg-white/5 backdrop-blur-xl
      border-b border-white/10
    ">

      {/* LEFT */}
      <div>
        <p className="text-sm opacity-60">
          AI Risk Intelligence Platform
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {user && (
          <div className="px-3 py-1 rounded-lg bg-white/10 text-xs">
            {user.toUpperCase()}
          </div>
        )}

        {user ? (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="
              px-4 py-2 rounded-xl
              bg-gradient-to-r from-red-500 to-pink-500
              hover:scale-105 transition
              text-sm
            "
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="
              px-4 py-2 rounded-xl
              bg-gradient-to-r from-blue-500 to-purple-500
              hover:scale-105 transition
              text-sm
            "
          >
            Login
          </button>
        )}

      </div>

    </div>
  );
}

export default Topbar;