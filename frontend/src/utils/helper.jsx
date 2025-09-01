export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};


export const formatDate = (date) => {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString();
};

export const normalizePosts = (data) => {
  return Array.isArray(data) ? data : data.posts || data.items || [];
};