import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: "🌧️",
      title: "Real-Time Risk Analysis",
      desc: "AI models analyze rainfall and AQI to predict disruption probability for your shift.",
    },
    {
      icon: "💸",
      title: "Earnings Protection",
      desc: "Know exactly how much income you could lose and how relocation changes the picture.",
    },
    {
      icon: "🛡️",
      title: "Parametric Insurance",
      desc: "Dynamic premiums priced to your risk. Automatic payouts when thresholds are crossed.",
    },
    {
      icon: "🗺️",
      title: "Shift Optimization",
      desc: "Get AI-recommended strategies to maximize earnings while minimizing weather risk.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Navbar />

      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 fade-in">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-4 py-1 rounded-full mb-6">
          AI-Powered Gig Worker Protection
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 max-w-3xl">
          Protect Your Income from{" "}
          <span className="gradient-text">Weather & Pollution</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          ShiftShield AI predicts disruption risk, optimizes your shifts, and auto-activates
          parametric insurance — so you never lose income to factors outside your control.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {user ? (
            <button
              onClick={() => navigate(user.role === "admin" ? "/admin" : "/dashboard")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:scale-105 transition pulse-glow"
            >
              Go to Dashboard →
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:scale-105 transition pulse-glow"
              >
                Get Started Free
              </button>
              <Link
                to="/login"
                className="px-8 py-4 border border-white/20 rounded-xl font-medium text-gray-300 hover:bg-white/5 transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-10">
          Everything a Gig Worker Needs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;