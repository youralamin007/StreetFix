// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👉 তোমার backend URL
});

// iccha hole helper function export korte পারো
export const getProblems = () => api.get("/problems");
export const getProblemById = (id) => api.get(`/problems/${id}`);
export const createProblem = (data) => api.post("/problems", data);
export const updateProblemStatus = (id, status) =>
  api.patch(`/problems/${id}`, { status });

export default api;