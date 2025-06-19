import { createPodcastCard } from "./PodcastCard.js";
import { genres } from "../data.js";

/**
 * Converts genre IDs to names.
 * @param {Object} podcast
 * @returns {string[]}
 */
function getGenreNames(podcast) {
  return podcast.genres.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre?.title || "Unknown";
  });
}
/**
 * Renders the given podcasts inside the given container.
 *
 * @param {HTMLElement} container - The DOM element to render into.
 * @param {Object[]} list - Array of podcast objects.
 */
export function renderPodcasts(container, list) {
  container.innerHTML = "";
  list.forEach((podcast) => {
    const genreNames = getGenreNames(podcast);
    const card = createPodcastCard(podcast, genreNames);
    container.appendChild(card);
  });
}
