export const API = process.env.REACT_APP_BASE_API_URL;

export const POST_STATUS = {
  published: {
    label: "🌟 Published",
    className: "bg-green-100 text-green-800",
  },
  draft: {
    label: "📝 Draft",
    className: "bg-yellow-100 text-yellow-800",
  },
};

export const DASHBOARD_STATS = [
  { key: "total", label: "Total Posts", icon: "📚", color: "blue" },
  { key: "published", label: "Published", icon: "🌟", color: "green" },
  { key: "draft", label: "Drafts", icon: "📝", color: "yellow" },
  { key: "authors", label: "Authors", icon: "👥", color: "purple" },
];