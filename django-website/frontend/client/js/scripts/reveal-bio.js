// Reveal bio when the page is loaded.

const bioElements = document.querySelectorAll('.js-show_bio');

/**
 * Reveal bio elements when the homepage is loaded
 */
function revealBio() {
  for (let i = 0; i < bioElements.length; i += 1) {
    bioElements[i].classList.add('is-element_revealed');
  }
}
if (bioElements) {
  window.addEventListener('load', revealBio);
}
