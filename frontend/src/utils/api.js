import axios from "axios";

const api = axios.create({
  baseURL: "",          // same-origin: http://localhost:5000
  withCredentials: true,
});

/* ---------------- Problems ---------------- */
export async function createProblem(payload) {
  const res = await api.post("/api/problems", payload);
  return res.data;
}

export async function getProblems() {
  const res = await api.get("/api/problems");
  return res.data; // backend returns array
}

export async function getProblemById(id) {
  const res = await api.get(`/api/problems/${id}`);
  return res.data;
}

export async function updateProblem(problemId, payload) {
  const res = await api.patch(`/api/problems/${problemId}`, payload);
  return res.data;
}

export async function updateProblemStatus(problemId, status) {
  const res = await api.patch(`/api/problems/${problemId}`, { status });
  return res.data;
}

/* ---------------- Admin ---------------- */
export async function adminLogin(email, password) {
  const res = await api.post("/api/admin/login", { email, password });
  return res.data; // { token, admin }
}

export default api;