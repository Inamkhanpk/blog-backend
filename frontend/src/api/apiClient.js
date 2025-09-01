import { API } from "../utils/constant";

const apiClient = async (endpoint, method = "GET", data, token) => {
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const options = { method, headers };
    if (data) options.body = JSON.stringify(data);

    const res = await fetch(`${API}${endpoint}`, options);

    if (res.status === 204) return null; // e.g., delete success

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
};

export default apiClient;