/**
 * @file Contains utility functions used across various modules of the application.
 * @description This module provides common helper functions to avoid code duplication,
 * such as date formatting.
 */

/**
 * Formats an ISO date string into a human-readable "time ago" format.
 * This function calculates the difference between the given date and the current date
 * and returns a string like "today", "1 day ago", "5 days ago", or "2 weeks ago".
 *
 * @param {string} isoDate - The ISO 8601 formatted date string (e.g., "2023-10-27T10:00:00.000Z").
 * @returns {string} A human-readable string indicating how long ago the date occurred.
 */
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
