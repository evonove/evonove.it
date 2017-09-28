// Randomize teammates order

const teamMates = document.querySelectorAll('.js-randomize_teammates');
const teamContainer = document.querySelector('.team-container');
const hiring = document.querySelector('.teammate_hiring');

/**
 * Randomize teammates nodes positions, then append the hiring node to the last
 * position.
 */
function randomize() {
  for (let i = 0; i < teamMates.length; i += 1) {
    teamContainer.appendChild(teamMates[(Math.random() * i) | 0]);
    teamContainer.appendChild(hiring);
  }
}

window.onload = randomize();
