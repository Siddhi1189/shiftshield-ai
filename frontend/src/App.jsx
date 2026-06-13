import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-load all pages for better initial load performance
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Policy = lazy(() => import("./pages/Policy"));
const Claims = lazy(() => import("./pages/Claims"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* WORKER ROUTES */}
          <Route path="/dashboard" element={
            <ProtectedRoute role="worker"><Dashboard /></ProtectedRoute>
          } />
          <Route path="/policy" element={
            <ProtectedRoute role="worker"><Policy /></ProtectedRoute>
          } />
          <Route path="/claims" element={
            <ProtectedRoute role="worker"><Claims /></ProtectedRoute>
          } />

          {/* ADMIN ROUTE */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin"><Admin /></ProtectedRoute>
          } />

          {/* 404 CATCH-ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;