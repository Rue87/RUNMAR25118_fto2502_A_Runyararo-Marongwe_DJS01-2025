/**
 * Filters the podcast list based on the selected genre.
 *
 * @param {Array<Object>} podcasts - Array of podcast objects to filter.
 * @param {string} selectedGenre - The selected genre ID from the dropdown.
 * @param {Array<Object>} genresData - The list of all genre objects (not used here but could be useful in future).
 * @returns {Array<Object>} - Filtered array of podcasts matching the selected genre.
 */
export function filterByGenre(podcasts, selectedGenre, genresData) {
  if (selectedGenre === "all") return podcasts;
  return podcasts.filter((podcast) =>
    podcast.genres.includes(Number(selectedGenre))
  );
}
export function sortPodcasts(podcasts, sortBy) {
  const sorted = [...podcasts];
  if (sortBy === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "recent") {
    sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }
  return sorted;
}
