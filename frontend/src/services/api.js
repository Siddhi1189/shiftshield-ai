import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// 🔹 Risk
export const getRisk = (rainfall, aqi) =>
  axios.post(`${BASE_URL}/risk`, { rainfall, aqi });

// 🔹 Earnings
export const getEarnings = (risk_score) =>
  axios.post(`${BASE_URL}/earnings`, { risk_score });

// 🔹 Insurance
export const getInsurance = (risk_score) =>
  axios.post(`${BASE_URL}/insurance`, { risk_score });

// 🔹 Decision
export const getDecision = (data) =>
  axios.post(`${BASE_URL}/decision`, data);

// Strategy
export const getStrategy = (risk_score) =>
  axios.post(`${BASE_URL}/strategy`, { risk_score });