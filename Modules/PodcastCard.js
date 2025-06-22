import { formatDate } from "./utils.js";
/**
 * @file Manages the creation of individual podcast preview cards for display.
 * @description This module provides a function to dynamically generate
 * the HTML structure for a single podcast card, including its image,
 * title, season count, genre badges, and last updated date.
 */
/**
 * Creates a DOM element representing a podcast preview card.
 * This function abstracts the process of building the HTML structure for a podcast card.
 *
 * @param {Object} podcast - The podcast object containing details to display on the card.
 * @param {string} podcast.image - URL of the podcast's cover image.
 * @param {string} podcast.title - The title of the podcast.
 * @param {number} podcast.seasons - The number of seasons the podcast has.
 * @param {string} podcast.updated - The ISO date string indicating when the podcast was last updated.
 * @param {string[]} genreNames - An array of human-readable genre names for the podcast.
 * @returns {HTMLDivElement} A `div` element configured as a podcast card.
 */
export function createPodcastCard(podcast, genreNames) {
  const card = document.createElement("div");
  card.className = "podcast-card";

  card.innerHTML = `
  <div class ="podcast-cover-wrapper">
    ${
      podcast.image
        ? `<img src="${podcast.image}" alt="${podcast.title} Cover" class="cover-img" />`
        : `<div class="placeholder-cover">Podcast Cover</div>`
    }
    </div>
        <h2 class="podcast-title">${podcast.title}</h2>
        <p class="podcast-seasons">${podcast.seasons} seasons</p>
        <div class = "genre-badges">
        ${genreNames
          .map((name) => `<span class="badge">${name}</span>`)
          .join("")}
        </div>
        <p class ="podcast-date">Updated: ${formatDate(podcast.updated)}</p>`;
  return card;
}
