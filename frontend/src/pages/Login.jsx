import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user?.role === "worker") navigate("/dashboard", { replace: true });
    if (user?.role === "admin") navigate("/admin", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email is required");
    if (!password.trim()) return setError("Password is required");
    if (password.length < 4) return setError("Password must be at least 4 characters");

    setIsSubmitting(true);
    // Simulated auth delay (replace with real API when backend auth is added)
    await new Promise((r) => setTimeout(r, 500));

    const role = email.toLowerCase().includes("admin") ? "admin" : "worker";
    login(role, email);
    navigate(role === "admin" ? "/admin" : "/dashboard", { replace: true });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
      <div className="glass-card p-8 w-full max-w-md fade-in">

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold gradient-text hover:opacity-80 transition">
            ⚡ ShiftShield AI
          </Link>
          <p className="text-gray-400 text-sm mt-2">Sign in to your account</p>
        </div>

        {/* Demo hint */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5 text-xs text-blue-300">
          <strong>Demo:</strong> Any email with &quot;admin&quot; logs in as Admin. All other emails log in as Worker.
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black/40 border border-white/10 rounded-xl outline-none focus:border-blue-500 transition placeholder-gray-600"
              autoComplete="email"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/40 border border-white/10 rounded-xl outline-none focus:border-blue-500 transition placeholder-gray-600"
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <p role="alert" className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;