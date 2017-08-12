// Reveal services while scrolling.

const services = document.querySelectorAll('.js-reveal_service');

/**
 * Use Waypoint.js to reveal each services when in viewport
 */
function revealService() {
  for (let i = 0; i < services.length; i += 1) {
    this.element.classList.add('is-element_revealed');
    this.destroy();
  }
}

for (let i = 0; i < services.length; i += 1) {
  new Waypoint({
    element: services[i],
    handler: revealService,
    offset: '76.999%',
  });
}
