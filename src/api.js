// frontend/src/api.js
import axios from "axios";

// Use the environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create a reusable axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ensures cookies/auth headers are sent if needed
});

export default api;
