import { genres, seasons } from "../data.js";

/**
 * @file Manages the display and behavior of the podcast detail modal.
 * @description This module handles opening and closing the podcast modal,
 * dynamically populating its content with podcast details,
 * genre names, last updated date, and season information.
 */

// Abstraction: These elements are encapsulated within the module's scope
const modal = document.getElementById("podcast-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalBody = document.getElementById("modal-body");

/**
 * Abstraction: Hides the complexity of mapping genre IDs to names.
 * Converts genre ID numbers in a podcast object to readable genre names.
 * @param {number[]} genreIds - Array of genre IDs.
 * @returns {string[]} Array of genre names.
 */
function getGenreNamesByIds(genreIds) {
  if (!Array.isArray(genreIds)) {
    console.warn("Expected genreIds to be an array, but got:", genreIds);
    return ["Unknown"];
  }
  return genreIds.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre?.title || "Unknown";
  });
}

/**
 * Abstraction & Encapsulation: Provides a simple interface to open the modal,
 * while encapsulating all the complex logic of fetching and rendering content.
 * @param {Object} podcast - Podcast object containing details.
 */
export function openModal(podcast) {
  modalBody.innerHTML = ""; // Clear previous content

  if (!podcast) {
    modalBody.innerHTML = "<p>Podcast data not found.</p>";
    return;
  }

  const podcastGenreNames = getGenreNamesByIds(podcast.genres);

  // Encapsulation: Fetching season data is handled within this module
  const podcastSeasonsData = seasons.find((s) => s.id === podcast.id);

  // Date formatting (can also be abstracted into utils if needed elsewhere)
  const lastUpdatedDate = new Date(podcast.updated).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Encapsulation: Building the modal's HTML content
  const htmlContent = `
    <div class="modal-header-section">
        <h2 class="modal-podcast-title">${podcast.title}</h2>

        <div class="modal-main-info">
            <img src="${podcast.image}" alt="${
    podcast.title
  } Cover" class="modal-podcast-cover">
            <div class="modal-text-details">
            <h4 class="description-heading">Description</h4> 
            <p class="modal-description">${podcast.description}</p>
                <div class="modal-genres">
                    <p><strong>Genres:</strong> <span>${podcastGenreNames.join(
                      ", "
                    )}</span></p>
                </div>
                <p class="modal-last-updated">Last updated: ${lastUpdatedDate}</p>
            </div>
        </div>

        <div class="modal-seasons-section">
            <h3 class="seasons-heading">Seasons</h3>
            <ul class="modal-season-list">
                ${
                  podcastSeasonsData &&
                  podcastSeasonsData.seasonDetails &&
                  podcastSeasonsData.seasonDetails.length > 0
                    ? podcastSeasonsData.seasonDetails
                        .map(
                          (season) => `
                        <li class="modal-season-item">
                            <span class="modal-season-title">${season.title}</span>
                            <span class="modal-episode-count">${season.episodes} episodes</span>
                        </li>
                    `
                        )
                        .join("")
                    : "<li>No season information available.</li>"
                }
            </ul>
        </div>
    `;

  modalBody.innerHTML = htmlContent;
  modal.classList.remove("hidden"); // Show the modal
}

/**
 * Hides the podcast detail modal from view.
 * This function encapsulates the DOM manipulation required to hide the modal
 * and clears its content for the next use.
 */
export function closeModal() {
  modal.classList.add("hidden");
  modalBody.innerHTML = ""; // Clear content when closing
}

// Encapsulation: Event listener for close button is managed here
closeModalBtn.addEventListener("click", closeModal);
