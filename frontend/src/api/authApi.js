import apiClient from "./apiClient";

export const loginApi = (email, password) =>
  apiClient("/auth/login", "POST", { email, password });

export const registerApi = (userData) =>
  apiClient("/auth/register", "POST", userData);