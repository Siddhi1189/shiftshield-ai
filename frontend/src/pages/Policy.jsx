import Layout from "../components/Layout";

function Policy() {
  const policy = {
    status: "Active",
    validity: "Mon Jun 16, 2025",
    premium: 20,
    coverage: 3000,
    triggers: [
      { label: "Rainfall", threshold: "> 80mm", icon: "🌧️" },
      { label: "AQI", threshold: "> 250", icon: "🌫️" },
    ],
    perks: [
      "Automatic payouts — no claim form needed",
      "Dynamic pricing adjusts weekly to your risk",
      "Cancel anytime, refund prorated",
    ],
  };

  const stats = [
    { label: "Status", value: policy.status, color: "text-green-400" },
    { label: "Valid Until", value: policy.validity, color: "text-white" },
    { label: "Weekly Premium", value: `₹${policy.premium}`, color: "text-blue-400" },
    { label: "Max Coverage", value: `₹${policy.coverage.toLocaleString()}`, color: "text-purple-400" },
  ];

  return (
    <Layout>
      <div className="fade-in space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Your Policy</h1>
          <p className="text-sm text-gray-400 mt-1">
            Parametric income protection — powered by real-time environmental data
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-5">
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Trigger conditions */}
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3">Payout Trigger Conditions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {policy.triggers.map((t) => (
              <div key={t.label} className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-sm text-gray-400">{t.threshold}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3">Policy Benefits</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {policy.perks.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Policy;