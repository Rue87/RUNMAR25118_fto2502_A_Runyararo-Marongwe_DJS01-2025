import { createPodcastCard } from "./PodcastCard.js";
import { genres } from "../data.js";
import { openModal } from "./modalManager.js";
/**
 * Abstraction: Hides the detail of how genre IDs are converted to names.
 * Converts genre IDs to names.
 * @param {Object} podcast
 * @returns {string[]} array of genre names
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

    //click event listener for the card to open the modal
    card.addEventListener("click", () => {
      openModal({
        ...podcast,
        genre: genreNames.join(", "), //pass genre as a string
      });
    });
    container.appendChild(card);
  });
}
