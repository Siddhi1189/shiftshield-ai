import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return;

    if (email.includes("admin")) {
        login("admin");
        navigate("/admin"); // 🔥 admin goes only to admin
    } else {
        login("worker");
        navigate("/dashboard"); // 🔥 worker goes only to dashboard
    }
    };

    useEffect(() => {
        if(user === "worker") navigate("/dashboard");
        if(user === "admin") navigate("/admin");
    }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-96 shadow-lg">

        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email (admin@ / worker@)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 bg-black/40 border border-white/10 rounded-xl outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 bg-black/40 border border-white/10 rounded-xl outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition"
        >
          Login
        </button>

        <p className="text-xs opacity-50 mt-4">
          Use "admin@" for admin access
        </p>

      </div>

    </div>
  );
}

export default Login;