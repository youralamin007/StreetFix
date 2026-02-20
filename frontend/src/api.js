import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// ---------- Problems ----------
export const getProblems = async () => {
  const { data } = await api.get("/api/problems");
  return data;
};

export const getProblemById = async (id) => {
  const { data } = await api.get(`/api/problems/${id}`);
  return data;
};

export const createProblem = async (payload) => {
  const { data } = await api.post("/api/problems", payload);
  return data;
};

// ---------- Update Status ----------
export const updateProblemStatus = async (id, status) => {
  const { data } = await api.patch(`/api/problems/${id}`, { status });
  return data;
};

// ---------- Admin Login ----------
export const adminLogin = async (payload) => {
  const { data } = await api.post("/api/admin/login", payload);
  return data;
};

export default api;