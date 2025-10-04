import axios from "axios";

export default axios.create({
  baseURL: "https://student-management-production-4c9e.up.railway.app",  // ✅ No "/students"
  headers: { "Content-Type": "application/json" },
});
