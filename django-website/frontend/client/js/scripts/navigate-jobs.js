// Navigate job positions

const smoothScroll = require('smoothscroll');

const selector = document.querySelectorAll('.position-selector-title');

/**
 * Navigate positions by using the data-position attribute as target.
 */
function navigatePositions() {
  const positionName = this.getAttribute('data-position');
  const positionTarget = document.querySelector(`[data-position="${positionName}"]`);
  smoothScroll(positionTarget.offsetTop, 618);
}

for (let i = 0; i < selector.length; i += 1) {
  selector[i].addEventListener('click', navigatePositions);
}
