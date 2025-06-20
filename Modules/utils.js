/*export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}*/
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const diffMs = Date.now() - date.getTime();
  const daysAgo = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (daysAgo === 0) return "today";
  if (daysAgo === 1) return "1 day ago";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  const weeks = Math.floor(daysAgo / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}