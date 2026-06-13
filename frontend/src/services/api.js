import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor — consistent error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.message ||
      "Something went wrong";
    console.error(`[API Error] ${error.config?.url}: ${message}`);
    return Promise.reject(new Error(message));
  }
);

export const getRisk = (rainfall, aqi) =>
  api.post("/risk", { rainfall, aqi });

export const getEarnings = (risk_score) =>
  api.post("/earnings", { risk_score });

export const getInsurance = (risk_score) =>
  api.post("/insurance", { risk_score });

export const getDecision = (data) =>
  api.post("/decision", data);

export const getStrategy = (risk_score) =>
  api.post("/strategy", { risk_score });

export default api;
