import { podcasts, genres } from "./data.js";
import { renderPodcasts } from "./Modules/renderManager.js";
import { sortPodcasts, filterByGenre } from "./Modules/filterManager.js";

/**
 * @const {HTMLElement} podcastContainer - The DOM element where podcast cards will be rendered.
 * @description This is the main container for displaying the list of podcasts.
 */
const podcastContainer = document.getElementById("podcast-container");

/**
 * @const {HTMLSelectElement} genreFilter - The dropdown element for selecting podcast genres.
 * @description Used by the user to filter podcasts by category.
 */
const genreFilter = document.getElementById("genre-filter-p");

/**
 * @const {HTMLSelectElement} sortFilter - The dropdown element for selecting podcast sorting options.
 * @description Used by the user to sort podcasts by title or recent update.
 */
const sortFilter = document.getElementById("sort-filter-p");

/**
 * Populates the genre filter dropdown with options based on the available genres in `data.js`.
 * Each genre from the imported `genres` array will be added as an option.
 */
genres.forEach((genre) => {
  const option = document.createElement("option");
  option.value = genre.id;
  option.textContent = genre.title;
  genreFilter.appendChild(option);
});

/**
 * @type {Array<Object>} currentList - Stores the currently displayed list of podcasts after filtering and sorting.
 * @description This variable is updated whenever filter or sort operations are performed.
 */
let currentList = podcasts;

/**
 * Initial rendering of podcasts when the application loads.
 * Podcasts are initially sorted by 'recent' update date.
 */
renderPodcasts(podcastContainer, sortPodcasts(currentList, "recent"));

/**
 * Event listener for changes on the genre filter dropdown.
 * When the genre filter changes, it re-filters `podcasts` based on the selected genre,
 * updates `currentList`, and then re-sorts and re-renders the list.
 */

genreFilter.addEventListener("change", () => {
  const genre = genreFilter.value;
  const sort = sortFilter.value;

  // Filter the original `podcasts` array, not `currentList`, to ensure filtering from full data

  const filtered = filterByGenre(podcasts, genre, genres);
  currentList = filtered;
  renderPodcasts(podcastContainer, sortPodcasts(currentList, sort));
});

/**
 * Event listener for changes on the sort filter dropdown.
 * When the sort filter changes, it re-sorts the `currentList` (which might already be filtered)
 * and re-renders the list.
 */
sortFilter.addEventListener("change", () => {
  const sort = sortFilter.value;
  renderPodcasts(podcastContainer, sortPodcasts(currentList, sort));
});
