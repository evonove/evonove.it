// Toggle the navigation when user taps on the appropriate button on small
// devices.

const openNav = document.querySelector('.open_nav');
const closeNav = document.querySelector('.close_nav');
const toggleNavListeners = document.querySelectorAll('.js-toggle_nav');

/**
 * Show/hide the navigation
 */
function toggleNav() {
  for (let i = 0; i < toggleNavListeners.length; i += 1) {
    toggleNavListeners[i].classList.toggle('is-nav_shown');
  }
}

openNav.addEventListener('touchstart', toggleNav);
closeNav.addEventListener('touchstart', toggleNav);
