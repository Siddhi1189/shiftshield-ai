import Layout from "../components/Layout";

function Claims() {
  return (
    <Layout>

      <h1 className="text-xl font-semibold mb-6">
        Claims
      </h1>

      <div className="space-y-4">

        <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
          <p>₹2000 - Rain disruption</p>
          <p className="text-sm text-gray-400">Processed</p>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
          <p>₹1500 - AQI spike</p>
          <p className="text-sm text-gray-400">Processed</p>
        </div>

      </div>

    </Layout>
  );
}

export default Claims;