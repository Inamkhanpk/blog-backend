import apiClient from "./apiClient";

export const getComments = (postId) =>
  apiClient(`/comments/${postId}`, "GET");

export const createComment = (token, postId, data) =>
  apiClient(`/comments/${postId}`, "POST", data, token);

export const deleteComment = (token, postId, commentId) =>
  apiClient(`/posts/${postId}/${commentId}`, "DELETE", null, token);
