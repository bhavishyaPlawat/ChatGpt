import axios from "axios";

// Detect local run vs production
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export const BACKEND_URL = isLocal 
  ? "http://localhost:3000" 
  : "https://chatgpt-backend-8psi.onrender.com";

export const API_BASE_URL = `${BACKEND_URL}/api`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
