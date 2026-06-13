import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const claims = [
  {
    id: "CLM-001",
    amount: 2000,
    reason: "Heavy rain disruption",
    date: "Jun 10, 2025",
    status: "Processed",
    statusColor: "text-green-400",
  },
  {
    id: "CLM-002",
    amount: 1500,
    reason: "AQI spike — hazardous conditions",
    date: "Jun 8, 2025",
    status: "Processed",
    statusColor: "text-green-400",
  },
  {
    id: "CLM-003",
    amount: 2500,
    reason: "Flood alert in zone 3B",
    date: "Jun 5, 2025",
    status: "Under Review",
    statusColor: "text-yellow-400",
  },
];

function Claims() {
  const { user } = useAuth();

  const totalPaid = claims
    .filter((c) => c.status === "Processed")
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <Layout>
      <div className="fade-in space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Claims History</h1>
          <p className="text-sm text-gray-400 mt-1">
            Parametric payouts triggered automatically when thresholds are crossed
          </p>
        </div>

        {/* Summary card */}
        <div className="glass-card p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-sm text-gray-400">Total received</p>
            <p className="text-3xl font-bold text-green-400">₹{totalPaid.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Claims filed</p>
            <p className="text-2xl font-semibold">{claims.length}</p>
          </div>
        </div>

        {/* Claims list */}
        <div className="space-y-3">
          {claims.map((c) => (
            <div
              key={c.id}
              className="glass-card p-5 flex flex-col sm:flex-row justify-between gap-3"
            >
              <div>
                <p className="font-semibold">₹{c.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-0.5">{c.reason}</p>
                <p className="text-xs text-gray-600 mt-1">{c.id} · {c.date}</p>
              </div>
              <span className={`text-sm font-medium self-start sm:self-center ${c.statusColor}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>

        {/* Trigger info */}
        <div className="glass-card p-5 text-sm text-gray-400">
          <p className="font-semibold text-white mb-2">Auto-trigger thresholds</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Rainfall &gt; 80mm → claim auto-activated</li>
            <li>AQI &gt; 250 → claim auto-activated</li>
            <li>Payout processed within 24 hours of trigger event</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Claims;