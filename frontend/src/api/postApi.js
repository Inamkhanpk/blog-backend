import apiClient from "./apiClient";

// Public posts
export const getPosts = (page = 1, search = "") =>
  apiClient(`/posts?page=${page}&search=${search}`);

export const getPostById = (id) =>
  apiClient(`/posts/${id}`);

// Admin posts
export const getAdminPosts = (token) =>
  apiClient(`/posts/getAllPosts`, "GET", null, token);

// Create / Update / Delete
export const createPost = (token, postData) =>
  apiClient(`/posts`, "POST", postData, token);

export const updatePost = (token, id, postData) =>
  apiClient(`/posts/${id}`, "PUT", postData, token);

export const deletePost = (token, id) =>
  apiClient(`/posts/${id}`, "DELETE", null, token);
