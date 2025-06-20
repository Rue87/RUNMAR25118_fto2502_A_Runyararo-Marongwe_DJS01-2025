const modal = document.getElementById("podcast-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalBody = document.getElementById("modal-body");

import { genres } from '../data.js'; 

/**
 * Opens the modal and fills it with podcast data.
 * @param {Object} podcast - Podcast object containing details.
 */
export function openModal(podcast) {
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
export function closeModal() {
  modal.classList.add("hidden");
}

// Event listener for close button
closeModalBtn.addEventListener("click", closeModal);