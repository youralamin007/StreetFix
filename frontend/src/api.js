// src/api.js
import axios from "axios";

// একই ডোমেইন থেকে কল করবে (Render/production এ perfect)
// লোকালে frontend:3000 হলে proxy দিয়ে কাজ করবে (নীচে বলছি)
const api = axios.create({
  baseURL: "/api",
});

export const getProblems = () => api.get("/problems");
export const getProblemById = (id) => api.get(`/problems/${id}`);
export const createProblem = (data) => api.post("/problems", data);
export const updateProblemStatus = (id, status) =>
  api.patch(`/problems/${id}`, { status });

export default api;