import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <Navbar />

      <div className="text-center mt-20">
        <h1 className="text-5xl font-bold mb-4">
          AI Income Protection
        </h1>

        <p className="opacity-60 mb-6">
          Predict risk. Optimize shifts. Protect earnings.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 px-6 py-3 rounded-xl"
        >
          Open Dashboard
        </button>
      </div>

    </div>
  );
}

export default Home;