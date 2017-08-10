// Reveal works and post previews while scrolling.

const slidingImages = document.querySelectorAll('.js-reveal_sliding');

/**
 * Use Waypoint.js to reveal works and post previews
 */
function revealServiceTitle() {
  for (let i = 0; i < slidingImages.length; i += 1) {
    this.element.classList.add('is-sliding_shown');
    this.destroy();
  }
}

for (let i = 0; i < slidingImages.length; i += 1) {
  new Waypoint({
    element: slidingImages[i],
    handler: revealServiceTitle,
    offset: '76.999%',
  });
}
