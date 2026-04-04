import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Policy from "./pages/Policy";
import Claims from "./pages/Claims";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* WORKER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="worker">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/policy"
          element={
            <ProtectedRoute role="worker">
              <Policy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/claims"
          element={
            <ProtectedRoute role="worker">
              <Claims />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;