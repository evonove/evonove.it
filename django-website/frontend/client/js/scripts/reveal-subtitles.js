// Reveal subtitles while scrolling.

const payoff = document.querySelectorAll('.payoff > .rich-text > p');
const subtitles = document.querySelectorAll('.js-show_subtitle h2');

/**
 * Use Waypoint.js to reveal every subtitles when they are on the viewport
 */
function revealSubtitle() {
  for (let i = 0; i < subtitles.length; i += 1) {
    this.element.classList.add('is-subtitle_shown');
    this.destroy();
  }
}

/**
 * Reveal the payoff when the homepage is loaded
 */
function revealPayoff() {
  for (let i = 0; i < payoff.length; i += 1) {
    payoff[i].classList.add('is-subtitle_shown');
  }
}

for (let i = 0; i < subtitles.length; i += 1) {
  new Waypoint({
    element: subtitles[i],
    handler: revealSubtitle,
    offset: '76.999%',
  });
}

window.addEventListener('load', revealPayoff);
