/**
 * Filters the podcast list based on the selected genre.
 *
 * @param {Array<Object>} podcasts - Array of podcast objects to filter.
 * @param {string} selectedGenre - The selected genre ID from the dropdown.
 * @param {Array<Object>} genresData - The list of all genre objects.
 * @returns {Array<Object>} - Filtered array of podcasts matching the selected genre.
 */
export function filterByGenre(podcasts, selectedGenre, genresData) {
  if (selectedGenre === "all") return podcasts;
  return podcasts.filter((podcast) =>
    podcast.genres.includes(Number(selectedGenre))
  );
}

/**
 * Sorts an array of podcast objects based on a specified criterion.
 * The original array is not modified; a new sorted array is returned.
 * @param {Array<Object>} podcasts - An array of podcast objects to be sorted.
 * @param {string} sortBy - The sorting criterion. Valid values are "title" (alphabetical by title) or "recent" (by last updated date, most recent first).
 * @returns {Array<Object>} A new array with the podcast objects sorted according to the `sortBy` parameter.
 */
export function sortPodcasts(podcasts, sortBy) {
  const sorted = [...podcasts];
  if (sortBy === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "recent") {
    sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }
  return sorted;
}
