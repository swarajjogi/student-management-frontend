import axios from "axios";

// Use environment variable if set (REACT_APP_API_URL), otherwise default to localhost
const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
