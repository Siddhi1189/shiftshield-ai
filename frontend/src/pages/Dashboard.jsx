import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  getRisk,
  getEarnings,
  getInsurance,
  getDecision,
  getStrategy,
} from "../services/api";

// Preset city data — typical peak-season / worst-case conditions for Indian gig-worker cities
// Risk levels based on these values (calculated by backend):
//   Low (<30%) · Medium (30–70%) · High (>70%)
const CITIES = [
  { name: "Mumbai",    state: "Maharashtra",   rainfall: 110, aqi: 145, emoji: "🌧️" }, // monsoon peak → Medium
  { name: "Delhi",     state: "NCT Delhi",     rainfall: 15,  aqi: 350, emoji: "🌫️" }, // winter smog  → High
  { name: "Bengaluru", state: "Karnataka",     rainfall: 55,  aqi: 95,  emoji: "🌦️" }, // mild         → Low
  { name: "Chennai",   state: "Tamil Nadu",    rainfall: 95,  aqi: 115, emoji: "🌧️" }, // monsoon      → Medium
  { name: "Kolkata",   state: "West Bengal",   rainfall: 130, aqi: 175, emoji: "⛈️" }, // heavy rain   → High
  { name: "Hyderabad", state: "Telangana",     rainfall: 45,  aqi: 120, emoji: "🌤️" }, // average      → Low
  { name: "Pune",      state: "Maharashtra",   rainfall: 65,  aqi: 88,  emoji: "🌦️" }, // moderate     → Low
  { name: "Ahmedabad", state: "Gujarat",       rainfall: 25,  aqi: 260, emoji: "🌫️" }, // industrial   → Medium
  { name: "Jaipur",    state: "Rajasthan",     rainfall: 10,  aqi: 275, emoji: "🌵" }, // dust haze    → Medium
  { name: "Lucknow",   state: "Uttar Pradesh", rainfall: 35,  aqi: 290, emoji: "🌫️" }, // fog season   → Medium
  { name: "Surat",     state: "Gujarat",       rainfall: 85,  aqi: 160, emoji: "🌦️" }, // rain+AQI     → Medium
  { name: "Kochi",     state: "Kerala",        rainfall: 150, aqi: 58,  emoji: "⛈️" }, // heavy monsoon→ High
];

function getRiskColor(score) {
  if (score >= 70) return "from-red-500/20 to-orange-500/20 border-red-400/30 shadow-[0_0_40px_rgba(239,68,68,0.3)]";
  if (score >= 30) return "from-yellow-500/10 to-orange-500/10 border-yellow-400/20 shadow-[0_0_40px_rgba(234,179,8,0.2)]";
  return "from-blue-500/10 to-purple-500/10 border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.3)]";
}

function getRiskTextColor(score) {
  if (score >= 70) return "from-red-400 to-orange-400";
  if (score >= 30) return "from-yellow-400 to-orange-400";
  return "from-blue-400 to-purple-400";
}

function Dashboard() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [rainfall, setRainfall] = useState(50);
  const [aqi, setAqi] = useState(100);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState("");
  const [typedText, setTypedText] = useState("");
  const [displayRisk, setDisplayRisk] = useState(0);

  // When a city is selected, auto-set sliders
  const selectCity = (city) => {
    setSelectedCity(city);
    setRainfall(city.rainfall);
    setAqi(city.aqi);
    setResult(null);
    setError("");
  };

  const runAnalysis = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);
      setTypedText("");
      setLoadingText("Analyzing environmental signals…");

      const risk = (await getRisk(rainfall, aqi)).data;
      const earnings = (await getEarnings(risk.risk_score)).data;
      const insurance = (await getInsurance(risk.risk_score)).data;
      const decision = (
        await getDecision({
          risk_score: risk.risk_score,
          stay_earnings: earnings.stay_earnings,
          relocate_earnings: earnings.relocate_earnings,
          loss: earnings.loss,
          premium: insurance.premium,
          coverage: insurance.coverage,
        })
      ).data;
      const strategy = (await getStrategy(risk.risk_score)).data;

      setLoadingText("");
      setResult({ risk, earnings, insurance, decision, strategy });
    } catch (err) {
      setError(err.message || "Analysis failed. Is the backend running?");
      setLoadingText("");
      setTypedText("");
    } finally {
      setLoading(false);
    }
  };

  // Smooth risk counter animation
  useEffect(() => {
    if (!result?.risk?.risk_score) return;
    let i = 0;
    const target = result.risk.risk_score;
    const interval = setInterval(() => {
      i += 1;
      setDisplayRisk(i);
      if (i >= target) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [result]);

  // Typing animation — safe slice approach avoids React batching / undefined bug
  useEffect(() => {
    if (!result?.decision?.recommendation) return;
    const text = result.decision.recommendation;
    let index = 0;
    setTypedText("");
    const id = setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index)); // always sets the full correct substring
      if (index >= text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id); // cleanup on re-render or unmount
  }, [result]);

  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold tracking-tight">
          Worker Intelligence Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Select your city, then run the AI analysis
        </p>
      </div>

      {/* CITY PICKER */}
      <div className="glass-card p-6 mb-6 fade-in">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-300">📍 Select Your City</p>
          {selectedCity && (
            <span className="text-xs text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
              {selectedCity.emoji} {selectedCity.name}, {selectedCity.state}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => selectCity(city)}
              className={`py-2.5 px-2 rounded-xl text-sm font-medium transition text-center border ${
                selectedCity?.name === city.name
                  ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-400/50 text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="block text-lg mb-0.5">{city.emoji}</span>
              <span className="block text-xs">{city.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* INPUT SLIDERS */}
      <div className="glass-card p-6 mb-6 fade-in">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-sm font-semibold text-gray-300">🌡️ Environmental Inputs</p>
            {selectedCity && (
              <p className="text-xs text-gray-500 mt-0.5">
                Pre-filled with {selectedCity.name} data — adjust if needed
              </p>
            )}
          </div>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition shadow-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing…
              </span>
            ) : (
              "⚡ Run Analysis"
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rainfall */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-gray-400">🌧️ Rainfall (mm)</label>
              <span className={`text-sm font-bold ${rainfall > 80 ? "text-red-400" : rainfall > 40 ? "text-yellow-400" : "text-green-400"}`}>
                {rainfall} mm
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={rainfall}
              onChange={(e) => { setRainfall(Number(e.target.value)); setSelectedCity(null); }}
              className="w-full"
              aria-label="Rainfall in mm"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0mm</span>
              <span className="text-yellow-600">80mm trigger</span>
              <span>200mm</span>
            </div>
          </div>

          {/* AQI */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-gray-400">🌫️ Air Quality Index (AQI)</label>
              <span className={`text-sm font-bold ${aqi > 250 ? "text-red-400" : aqi > 150 ? "text-yellow-400" : "text-green-400"}`}>
                {aqi}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={aqi}
              onChange={(e) => { setAqi(Number(e.target.value)); setSelectedCity(null); }}
              className="w-full"
              aria-label="Air Quality Index"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0</span>
              <span className="text-yellow-600">250 trigger</span>
              <span>500</span>
            </div>
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 mb-6 text-sm text-red-300 fade-in">
          ⚠️ {error}
        </div>
      )}

      {/* LOADING STATE */}
      {loading && !result && (
        <div className="glass-card p-8 mb-6 flex flex-col items-center gap-4 fade-in">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">{loadingText}</p>
        </div>
      )}

      {/* RESULTS */}
      {result && (
        <>
          {/* City + analysis banner */}
          {selectedCity && (
            <div className="text-xs text-gray-500 mb-4 flex items-center gap-2 fade-in">
              <span>{selectedCity.emoji}</span>
              <span>Showing AI analysis for <strong className="text-gray-300">{selectedCity.name}</strong></span>
            </div>
          )}

          {/* TOP ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 fade-in">
            {/* Risk Score */}
            <div className={`bg-gradient-to-br ${getRiskColor(result.risk.risk_score)} backdrop-blur-xl border p-6 rounded-2xl text-center hover:scale-105 transition duration-300`}>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Risk Score</p>
              <p className={`text-5xl font-bold mt-2 bg-gradient-to-r ${getRiskTextColor(result.risk.risk_score)} text-transparent bg-clip-text`}>
                {displayRisk}%
              </p>
              <span className={`inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-medium ${
                result.risk.risk_level === "High" ? "bg-red-500/20 text-red-300" :
                result.risk.risk_level === "Medium" ? "bg-yellow-500/20 text-yellow-300" :
                "bg-green-500/20 text-green-300"
              }`}>
                {result.risk.risk_level} Risk
              </span>
              <p className="text-xs text-gray-500 mt-2">Confidence: {result.risk.confidence}%</p>
            </div>

            {/* AI Decision */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">AI Decision</p>
              <p className="text-sm font-semibold text-purple-300 mb-2">{result.decision.decision}</p>
              <p className="text-xs text-gray-400 leading-relaxed min-h-[48px]">{typedText}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {result.decision.should_relocate && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">📍 Relocate</span>
                )}
                {result.decision.should_claim && (
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">✅ Claim Active</span>
                )}
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:scale-105 transition">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Earnings Impact</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Stay</span>
                  <span className="font-semibold text-green-400">₹{result.earnings.stay_earnings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Relocate</span>
                  <span className="font-semibold text-blue-400">₹{result.earnings.relocate_earnings}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between">
                  <span className="text-gray-400">Potential Loss</span>
                  <span className="font-bold text-red-400">−₹{result.earnings.loss}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RISK FACTORS */}
          {result.risk.factors.length > 0 && (
            <div className="glass-card p-5 mb-5 fade-in">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">⚠️ Active Risk Factors</p>
              <ul className="space-y-1.5">
                {result.risk.factors.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-red-400 mt-0.5">●</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* STRATEGY HERO */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-400/30 backdrop-blur-xl rounded-2xl p-7 mb-5 shadow-[0_0_60px_rgba(59,130,246,0.3)] fade-in">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Shift Strategy</p>
            <h2 className="text-lg font-semibold">{result.strategy.plan}</h2>
            <p className="text-xs text-gray-500 mt-1">{result.strategy.reason}</p>
            {result.strategy.expected_gain > 0 && (
              <p className="text-green-400 mt-3 text-xl font-bold">
                +₹{result.strategy.expected_gain} expected gain
              </p>
            )}
          </div>

          {/* BOTTOM ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 fade-in">
            {/* Insurance */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Insurance Model</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Weekly Premium</span>
                  <span className="font-semibold">₹{result.insurance.premium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Coverage</span>
                  <span className="font-semibold text-green-400">₹{result.insurance.coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Model</span>
                  <span className="text-xs text-purple-300">{result.insurance.model}</span>
                </div>
              </div>
            </div>

            {/* Auto Claim */}
            <div className={`border backdrop-blur-xl p-6 rounded-2xl ${
              result.risk.risk_score > 70
                ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/30 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
                : "bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-400/30 shadow-[0_0_40px_rgba(168,85,247,0.3)]"
            }`}>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Auto Claim Engine</p>
              {result.risk.risk_score > 70 ? (
                <>
                  <p className="text-green-400 font-bold text-sm">⚡ Claim Triggered Automatically</p>
                  <p className="text-2xl font-bold mt-2">₹{result.insurance.coverage}</p>
                  <p className="text-xs text-gray-500 mt-1">credited to your account</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-400">No disruption threshold crossed</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Triggers at Rainfall &gt;80mm or AQI &gt;250
                  </p>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Dashboard;