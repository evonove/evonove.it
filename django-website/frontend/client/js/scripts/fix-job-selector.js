// Fix job selector component after a certain scroll value

const jobSelector = document.querySelector('.position-selector');

/**
 * Use Waypoint.js to fix the Job selector component during scroll
 */
function fixJobSelector() {
  jobSelector.classList.toggle('is-fixed');
}

/**
 * Use Waypoint.js remove all component transitions once it is fixed.
 */
function removeTransition() {
  jobSelector.classList.add('is-transition_done');
  this.destroy();
}

if (jobSelector) {
  new Waypoint({
    element: jobSelector,
    handler: fixJobSelector,
    offset: '17.942%',
  });

  new Waypoint({
    element: jobSelector,
    handler: removeTransition,
    offset: '17.942%',
  });
}
