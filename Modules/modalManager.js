/*import { genres ,seasons } from '../data.js'; 

const modal = document.getElementById("podcast-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalBody = document.getElementById("modal-body");

/**
 * Converts genre ID numbers in a podcast object to readable genre names.
 * This function should ideally live in a utility file or be passed into openModal
 * if not strictly within modalManager's scope, but for now, we'll put it here.
 * @param {string[]} genreIds - Array of genre ID numbers.
 * @returns {string[]} Array of genre names.
 */
/*function getGenreNamesByIds(genreIds) {
    if (!Array.isArray(genreIds)) {
        console.warn("Expected genreIds to be an array, but got:", genreIds);
        return ['Unknown'];
    }
    return genreIds.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre?.title || 'Unknown';
    });
}

/**
 * Opens the modal and fills it with podcast data.
 * @param {Object} podcast - Podcast object containing details.
 */
/*export function openModal(podcast) {
  modalBody.innerHTML = `
    <h2>${podcast.title}</h2>
    <img src="${podcast.image}" alt="${podcast.title}" style="width: 100%; border-radius: 10px;">
    <p><strong>Genre:</strong> ${podcast.genre}</p>
    <p><strong>Description:</strong> ${podcast.description}</p>
    <p><strong>Last updated:</strong> ${podcast.lastUpdated}</p>
  `;
  modal.classList.remove("hidden");
}

/**
 * Closes the modal by hiding it.
 */
/*export function closeModal() {
  modal.classList.add("hidden");
}

// Event listener for close button
closeModalBtn.addEventListener("click", closeModal);*/

import { genres, seasons } from '../data.js'; // Ensure correct path for data.js

// Abstraction: These elements are encapsulated within the module's scope
const modal = document.getElementById("podcast-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalBody = document.getElementById("modal-body");

/**
 * Abstraction: Hides the complexity of mapping genre IDs to names.
 * Converts genre ID numbers in a podcast object to readable genre names.
 * @param {string[]} genreIds - Array of genre ID numbers.
 * @returns {string[]} Array of genre names.
 */
function getGenreNamesByIds(genreIds) {
    if (!Array.isArray(genreIds)) {
        console.warn("Expected genreIds to be an array, but got:", genreIds);
        return ['Unknown'];
    }
    return genreIds.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre?.title || 'Unknown';
    });
}

/**
 * Abstraction & Encapsulation: Provides a simple interface to open the modal,
 * while encapsulating all the complex logic of fetching and rendering content.
 * @param {Object} podcast - Podcast object containing details.
 */
export function openModal(podcast) {
    modalBody.innerHTML = ''; // Clear previous content 

    if (!podcast) {
        modalBody.innerHTML = '<p>Podcast data not found.</p>';
        return;
    }

    const podcastGenreNames = getGenreNamesByIds(podcast.genres);

    // Encapsulation: Fetching season data is handled within this module
    const podcastSeasonsData = seasons.find(s => s.id === podcast.id);

    // Date formatting (can also be abstracted into utils if needed elsewhere)
    const lastUpdatedDate = new Date(podcast.updated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Encapsulation: Building the modal's HTML content
    const htmlContent = `
    <div class="modal-header-section">
        <h2 class="modal-podcast-title">${podcast.title}</h2>

        <div class="modal-main-info">
            <img src="${podcast.image}" alt="${podcast.title} Cover" class="modal-podcast-cover">
            <div class="modal-text-details">
            <h4 class="description-heading">Description</h4> 
            <p class="modal-description">${podcast.description}</p>
                <div class="modal-genres">
                    <p><strong>Genres:</strong> <span>${podcastGenreNames.join(', ')}</span></p>
                </div>
                <p class="modal-last-updated">Last updated: ${lastUpdatedDate}</p>
            </div>
        </div>

        <div class="modal-seasons-section">
            <h3 class="seasons-heading">Seasons</h3>
            <ul class="modal-season-list">
                ${podcastSeasonsData && podcastSeasonsData.seasonDetails && podcastSeasonsData.seasonDetails.length > 0 ?
                    podcastSeasonsData.seasonDetails.map(season => `
                        <li class="modal-season-item">
                            <span class="modal-season-title">${season.title}</span>
                            <span class="modal-episode-count">${season.episodes} episodes</span>
                        </li>
                    `).join('')
                    : '<li>No season information available.</li>'
                }
            </ul>
        </div>
    `;

    modalBody.innerHTML = htmlContent;
    modal.classList.remove("hidden"); // Show the modal
}

/**
 * Encapsulation: Hides the detail of how the modal is hidden.
 */
export function closeModal() {
    modal.classList.add("hidden");
    modalBody.innerHTML = ''; // Clear content when closing
}

// Encapsulation: Event listener for close button is managed here
closeModalBtn.addEventListener("click", closeModal);