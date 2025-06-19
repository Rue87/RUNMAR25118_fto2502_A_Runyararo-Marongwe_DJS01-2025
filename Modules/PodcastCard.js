import { formatDate } from "./utils.js";

export function createPodcastCard(podcast, genreNames) {
  const card = document.createElement("div");
  card.className = "podcast-card";

  const coverStyle = podcast.image
    ? `<img src="${podcast.image}" alt="${podcast.title} cover" class="podcast-cover-image">`
    : `<div class="podcast-cover">Podcast Cover</div>`;
  // If the podcast has no image, we can set a default cover style or leave it empty.
  card.innerHTML = `
  <div class ="podcast-cover-wrapper">
    ${podcast.image
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
