import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://students-backend-ecur.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;