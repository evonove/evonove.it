// Reveal stack elements while scrolling.

const stackElements = document.querySelectorAll('.js-show_stack');

/**
 * Use Waypoint.js to reveal stack elements
 */
function revealStack() {
  for (let i = 0; i < stackElements.length; i += 1) {
    this.element.classList.add('is-element_revealed');
    this.destroy();
  }
}

for (let i = 0; i < stackElements.length; i += 1) {
  new Waypoint({
    element: stackElements[i],
    handler: revealStack,
    offset: '76.999%',
  });
}
