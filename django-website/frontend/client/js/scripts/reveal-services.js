// Reveal services while scrolling.

const servicesTitles = document.querySelectorAll('.js-show_service_title > h3');
const servicesDescription = document.querySelectorAll('.js-show_service_description');

/**
 * Use Waypoint.js to reveal services titles
 */
function revealServiceTitle() {
  for (let i = 0; i < servicesTitles.length; i += 1) {
    this.element.classList.add('is-service_shown');
    this.destroy();
  }
}

/**
 * Use Waypoint.js to reveal services descriptions
 */
function revealServiceDescription() {
  for (let i = 0; i < servicesDescription.length; i += 1) {
    this.element.classList.add('is-service_shown');
    this.destroy();
  }
}

for (let i = 0; i < servicesTitles.length; i += 1) {
  new Waypoint({
    element: servicesTitles[i],
    handler: revealServiceTitle,
    offset: '76.999%',
  });
}

for (let i = 0; i < servicesDescription.length; i += 1) {
  new Waypoint({
    element: servicesDescription[i],
    handler: revealServiceDescription,
    offset: '76.999%',
  });
}
