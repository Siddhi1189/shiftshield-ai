import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role mismatch
  if (role && user !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;