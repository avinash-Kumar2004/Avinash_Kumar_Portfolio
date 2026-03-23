const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const API = {
  contact:   `${API_BASE}/contact`,
  subscribe: `${API_BASE}/subscribe`,
};
