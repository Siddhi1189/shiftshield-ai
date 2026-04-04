import Layout from "../components/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

function Admin() {

  const claimsData = [
    { day: "Mon", claims: 12 },
    { day: "Tue", claims: 18 },
    { day: "Wed", claims: 10 },
    { day: "Thu", claims: 22 },
    { day: "Fri", claims: 30 },
  ];

  const riskData = [
    { name: "Low", value: 40 },
    { name: "Medium", value: 35 },
    { name: "High", value: 25 },
  ];

  const fraudData = [
    { type: "GPS", cases: 4 },
    { type: "Activity", cases: 2 },
    { type: "Multiple", cases: 3 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        Admin Analytics
      </h1>

      {/* METRICS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
          <p>Total Claims</p>
          <p className="text-2xl font-bold">128</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
          <p>Fraud Alerts</p>
          <p className="text-2xl text-red-400">6</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
          <p>Users</p>
          <p className="text-2xl">342</p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
          <p className="mb-4">Claims Trend</p>
          <LineChart width={320} height={200} data={claimsData}>
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line dataKey="claims" stroke="#3b82f6" />
          </LineChart>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
          <p className="mb-4">Risk Distribution</p>
          <PieChart width={320} height={200}>
            <Pie data={riskData} dataKey="value">
              {riskData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
          <p className="mb-4">Fraud Analysis</p>
          <BarChart width={320} height={200} data={fraudData}>
            <XAxis dataKey="type" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="cases" fill="#ef4444" />
          </BarChart>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
          <p className="mb-4">System Logs</p>
          <div className="text-sm opacity-70 space-y-2">
            <p>✔ Claim triggered</p>
            <p>✔ Fraud check passed</p>
            <p>⚠ Suspicious GPS detected</p>
            <p>✔ Payout completed</p>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Admin;