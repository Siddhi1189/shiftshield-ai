import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
      <div className="text-center fade-in">
        <h1 className="text-9xl font-extrabold gradient-text mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">
          Oops — this page doesn&apos;t exist
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:scale-105 transition font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
