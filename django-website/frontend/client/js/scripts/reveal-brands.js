// Reveal clients' brand while scrolling.

const brandsList = document.querySelector('.brands');
const brands = document.querySelectorAll('.js-show_client');
const contactUs = document.querySelector('.contact_us');

/**
 * Use Waypoint.js to reveal brands
 */
function revealBrands() {
  for (let i = 0; i < brands.length; i += 1) {
    brands[i].classList.add('is-element_revealed');
    this.destroy();
  }
  contactUs.classList.add('is-element_revealed');
}

if (brandsList) {
  new Waypoint({
    element: brandsList,
    handler: revealBrands,
    offset: '76.999%',
  });
}
