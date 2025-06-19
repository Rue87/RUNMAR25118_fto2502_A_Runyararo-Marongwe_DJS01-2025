import { podcasts, genres } from './data.js';
import { renderPodcasts} from './Modules/renderManager.js';
import { sortPodcasts, filterByGenre } from './Modules/filterManager.js';

const podcastContainer = document.getElementById('podcast-container');
const genreFilter = document.getElementById('genre-filter-p');
const sortFilter = document.getElementById('sort-filter-p');

// Populate genre dropdown
genres.forEach(genre => {
  const option = document.createElement('option');
  option.value = genre.id;
  option.textContent = genre.title;
  genreFilter.appendChild(option);
});

let currentList = podcasts;
renderPodcasts(podcastContainer, sortPodcasts(currentList, 'recent'));

genreFilter.addEventListener('change', () => {
  const genre = genreFilter.value;
  const sort = sortFilter.value;
  const filtered = filterByGenre(podcasts, genre, genres);
  currentList = filtered;
  renderPodcasts(podcastContainer, sortPodcasts(currentList, sort));
});

sortFilter.addEventListener('change', () => {
  const sort = sortFilter.value;
  renderPodcasts(podcastContainer, sortPodcasts(currentList, sort));
})


/**
 * Converts genre ID numbers in a podcast object to readable genre names.
 *
 * @param {Object} podcast - The podcast object with a `genres` array.
 * @returns {string[]} Array of genre names.
 *
function getGenreNames(podcast) {
  return podcast.genres.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre?.title || 'Unknown';
  });
}
  */
