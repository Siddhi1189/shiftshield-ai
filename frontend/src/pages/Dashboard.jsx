import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  getRisk,
  getEarnings,
  getInsurance,
  getDecision,
  getStrategy,
} from "../services/api";

function Dashboard() {
  const [rainfall, setRainfall] = useState(50);
  const [aqi, setAqi] = useState(100);
  const [result, setResult] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [displayRisk, setDisplayRisk] = useState(0);

  const runAnalysis = async () => {
    try {
      setTypedText("Analyzing environmental signals...");

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

      setResult({ risk, earnings, insurance, decision, strategy });

    } catch (err) {
      console.error(err);
    }
  };

  // Smooth risk animation
  useEffect(() => {
    if (result?.risk?.risk_score) {
      let i = 0;
      const target = result.risk.risk_score;

      const interval = setInterval(() => {
        i += 1;
        setDisplayRisk(i);
        if (i >= target) clearInterval(interval);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [result]);

  // Fixed typing animation
  useEffect(() => {
    if (result?.decision?.recommendation) {
      const text = result.decision.recommendation;
      let index = 0;

      setTypedText("");

      const interval = setInterval(() => {
        setTypedText((prev) => {
          const next = prev + text[index];
          index++;
          if (index >= text.length) clearInterval(interval);
          return next;
        });
      }, 12);

      return () => clearInterval(interval);
    }
  }, [result]);

  return (
    <Layout>

      {/* HERO HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Worker Intelligence Dashboard
        </h1>
        <p className="text-sm opacity-60 mt-1">
          Real-time AI insights for income protection
        </p>
      </div>

      {/* INPUT PANEL */}
      <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm opacity-60">Live Inputs</p>

          <button
            onClick={runAnalysis}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition shadow-lg"
          >
            Run Analysis
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-xs opacity-50">Rainfall</label>
            <input
              type="range"
              min="0"
              max="100"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          <div>
            <label className="text-xs opacity-50">AQI</label>
            <input
              type="range"
              min="0"
              max="300"
              value={aqi}
              onChange={(e) => setAqi(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>

        </div>
      </div>

      {/* RESULT */}
      {result && (
  <>
        {/* TOP GRID */}
        <div className="grid grid-cols-3 gap-6 mb-8">

        {/* RISK */}
        <div className="
            bg-gradient-to-br from-blue-500/10 to-purple-500/10
            backdrop-blur-xl border border-white/10
            p-6 rounded-2xl text-center
            hover:scale-105 transition duration-300
            shadow-[0_0_40px_rgba(59,130,246,0.3)]
        ">
            <p className="text-xs opacity-50">RISK SCORE</p>

            <p className="text-5xl font-bold mt-2 
            bg-gradient-to-r from-blue-400 to-purple-400 
            text-transparent bg-clip-text">
            {displayRisk}%
            </p>

            <p className="mt-2 text-sm opacity-70">
            {result.risk.risk_level}
            </p>
        </div>

        {/* AI DECISION */}
        <div className="
            bg-white/5 backdrop-blur-xl border border-white/10
            p-6 rounded-2xl
            shadow-[0_0_30px_rgba(168,85,247,0.2)]
        ">
            <p className="text-xs opacity-50 mb-2">
            AI DECISION ENGINE
            </p>

            <p className="text-sm leading-relaxed">
            {typedText}
            </p>
        </div>

        {/* EARNINGS */}
        <div className="
            bg-white/5 backdrop-blur-xl border border-white/10
            p-6 rounded-2xl hover:scale-105 transition
        ">
            <p className="text-xs opacity-50 mb-2">
            EARNINGS IMPACT
            </p>

            <p>Stay: ₹{result.earnings.stay_earnings}</p>
            <p>Relocate: ₹{result.earnings.relocate_earnings}</p>

            <p className="text-red-400 mt-2 font-semibold">
            Loss: ₹{result.earnings.loss}
            </p>
        </div>

        </div>

        {/* STRATEGY HERO */}
        <div className="
        bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10
        border border-blue-400/30
        backdrop-blur-xl rounded-2xl p-8 mb-8
        shadow-[0_0_60px_rgba(59,130,246,0.3)]
        ">
        <p className="text-xs opacity-50">SHIFT STRATEGY</p>

        <h2 className="text-xl font-semibold mt-2">
            {result.strategy.plan}
        </h2>

        <p className="text-green-400 mt-3 text-lg font-bold">
            +₹{result.strategy.expected_gain}
        </p>
        </div>

        {/* TRIGGERS (IMPORTANT FOR PHASE 2) */}
        <div className="
        bg-white/5 backdrop-blur-xl border border-white/10
        p-6 rounded-2xl mb-8
        shadow-[0_0_30px_rgba(59,130,246,0.2)]
        ">
        <p className="text-xs opacity-50 mb-3">
            AI TRIGGER SYSTEM
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
            <p>✔ Rainfall {'>'} 80mm</p>
            <p>✔ AQI {'>'} 250</p>
            <p>✔ Flood risk detected</p>
            <p>✔ Traffic slowdown</p>
        </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-2 gap-6">

        {/* INSURANCE */}
        <div className="
            bg-white/5 backdrop-blur-xl border border-white/10
            p-6 rounded-2xl
        ">
            <p className="text-xs opacity-50 mb-2">
            INSURANCE MODEL
            </p>

            <p>Premium: ₹{result.insurance.premium}</p>
            <p className="text-green-400">
            Coverage: ₹{result.insurance.coverage}
            </p>
        </div>

        {/* AUTO CLAIM (NO BUTTON) */}
        <div className="
            bg-gradient-to-br from-purple-500/10 to-blue-500/10
            border border-purple-400/30
            backdrop-blur-xl p-6 rounded-2xl
            shadow-[0_0_40px_rgba(168,85,247,0.3)]
        ">
            <p className="text-xs opacity-50 mb-2">
            AUTO CLAIM ENGINE
            </p>

            {result.risk.risk_score > 70 ? (
            <>
                <p className="text-green-400 font-bold">
                ⚡ Claim Triggered Automatically
                </p>

                <p className="text-lg mt-2">
                ₹{result.insurance.coverage} credited
                </p>
            </>
            ) : (
            <p className="text-sm opacity-60">
                No disruption detected
            </p>
            )}
        </div>

        </div>
    </>
    )}

    </Layout>
  );
}

export default Dashboard;