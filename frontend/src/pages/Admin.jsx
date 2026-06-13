import Layout from "../components/Layout";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";

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
  { type: "GPS Spoof", cases: 4 },
  { type: "Activity", cases: 2 },
  { type: "Multiple", cases: 3 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const TOOLTIP_STYLE = {
  backgroundColor: "#1e293b",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#f8fafc",
};

const metrics = [
  { label: "Total Claims", value: "128", icon: "📋", color: "text-blue-400" },
  { label: "Fraud Alerts", value: "6", icon: "⚠️", color: "text-red-400" },
  { label: "Active Users", value: "342", icon: "👥", color: "text-green-400" },
  { label: "Payouts (₹)", value: "2,84,000", icon: "💰", color: "text-purple-400" },
];

const logs = [
  { icon: "✅", msg: "Claim CLM-128 auto-triggered — AQI 260", time: "2m ago" },
  { icon: "✅", msg: "Fraud check passed for user #4421", time: "15m ago" },
  { icon: "⚠️", msg: "Suspicious GPS detected — user #3812", time: "1h ago" },
  { icon: "✅", msg: "Payout of ₹2000 completed to user #2291", time: "2h ago" },
];

function Admin() {
  return (
    <Layout>
      <div className="fade-in space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Admin Analytics</h1>
          <p className="text-sm text-gray-400 mt-1">Platform-wide overview — real-time data</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{m.icon}</span>
                <p className="text-xs text-gray-400">{m.label}</p>
              </div>
              <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Claims trend */}
          <div className="glass-card p-5">
            <p className="font-semibold mb-4">Claims Trend (This Week)</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={claimsData}>
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line dataKey="claims" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk distribution */}
          <div className="glass-card p-5">
            <p className="font-semibold mb-4">Risk Distribution</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={riskData} dataKey="value" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {riskData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Fraud analysis */}
          <div className="glass-card p-5">
            <p className="font-semibold mb-4">Fraud Analysis</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={fraudData}>
                <XAxis dataKey="type" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="cases" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* System logs */}
          <div className="glass-card p-5">
            <p className="font-semibold mb-4">System Logs</p>
            <ul className="space-y-3">
              {logs.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5">{l.icon}</span>
                  <div className="flex-1">
                    <p className="text-gray-300">{l.msg}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{l.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Admin;