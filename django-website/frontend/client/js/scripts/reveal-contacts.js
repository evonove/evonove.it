// Reveal contacts while scrolling

const contacts = document.querySelectorAll('.js-reveal_contacts');

/**
 * Use Waypoint.js to reveal contacts when in viewport
 */
function revealContacts() {
  for (let i = 0; i < contacts.length; i += 1) {
    this.element.classList.add('is-element_revealed');
    this.destroy();
  }
}

for (let i = 0; i < contacts.length; i += 1) {
  new Waypoint({
    element: contacts[i],
    handler: revealContacts,
    offset: '76.999%',
  });
}
