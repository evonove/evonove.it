// Reveal Careers elements while scrolling.

const hiringSplash = document.querySelectorAll('.js-reveal_hiring');
const hiringJobs = document.querySelectorAll('.js-reveal_job');

/**
 * Reveal Careers intro and position selector when page is loaded.
 */
function revealHiringSplash() {
  for (let i = 0; i < hiringSplash.length; i += 1) {
    hiringSplash[i].classList.add('is-element_revealed');
  }
}

/**
 * Use Waypoint.js to reveal each job when on viewport
 */
function revealJobs() {
  for (let i = 0; i < hiringJobs.length; i += 1) {
    this.element.classList.add('is-element_revealed');
    this.destroy();
  }
}

for (let i = 0; i < hiringJobs.length; i += 1) {
  new Waypoint({
    element: hiringJobs[i],
    handler: revealJobs,
    offset: '76.999%',
  });
}

window.addEventListener('load', revealHiringSplash);
