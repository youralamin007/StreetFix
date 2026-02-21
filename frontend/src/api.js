// frontend/src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "", // same origin: http://localhost:5000 অথবা live domain
  withCredentials: true,
});

// -------------------- Problems --------------------
export async function createProblem(payload) {
  const res = await api.post("/api/problems", payload);
  return res.data;
}

export async function getProblems() {
  const res = await api.get("/api/problems");
  return res.data;
}

export async function getProblemById(id) {
  const res = await api.get(`/api/problems/${id}`);
  return res.data;
}

// ✅ backend has PATCH "/api/problems/:id"
export async function updateProblemStatus(problemId, status) {
  const res = await api.patch(`/api/problems/${problemId}`, { status });
  return res.data;
}

// Optional generic update (if your UI uses it)
export async function updateProblem(problemId, payload) {
  const res = await api.patch(`/api/problems/${problemId}`, payload);
  return res.data;
}

// -------------------- Auth/Admin (if your UI imports these) --------------------
export async function login(email, password) {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
}

export async function register(name, email, password) {
  const res = await api.post("/api/auth/register", { name, email, password });
  return res.data;
}

export async function adminLogin(email, password) {
  const res = await api.post("/api/admin/login", { email, password });
  return res.data;
}

export default api;