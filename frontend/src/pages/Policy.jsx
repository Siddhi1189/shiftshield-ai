import Layout from "../components/Layout";

function Policy() {
  return (
    <Layout>

      <h1 className="text-xl font-semibold mb-6">
        Policy Overview
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
          <p className="text-sm text-gray-400">Status</p>
          <p className="mt-2 font-semibold">Active</p>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
          <p className="text-sm text-gray-400">Validity</p>
          <p className="mt-2 font-semibold">Till Sunday</p>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
          <p className="text-sm text-gray-400">Premium</p>
          <p className="mt-2 font-semibold">₹20/week</p>
        </div>

        <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
          <p className="text-sm text-gray-400">Coverage</p>
          <p className="mt-2 font-semibold text-green-400">
            ₹3000
          </p>
        </div>

      </div>

    </Layout>
  );
}

export default Policy;