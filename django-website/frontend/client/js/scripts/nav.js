// Toggle the navigation when user taps on the appropriate button on small
// devices.
// Expand/shrink the logo placed in the header.

const navElements = document.querySelectorAll('.js-toggle_nav');
const openNav = document.querySelector('.open_nav');
const closeNav = document.querySelector('.close_nav');
const logo = document.querySelector('.header-main_interactions-logo');
const logoGlyphs = document.querySelectorAll('.js-expand_logo');

let mobile;

if (window.innerWidth <= 980) {
  mobile = true;
}

/**
 * Show/hide the navigation.
 * Expand/Shrink the logo place in the header.
 */
function toggleNav() {
  for (let i = 0; i < navElements.length; i += 1) {
    navElements[i].classList.toggle('is-nav_shown');
  }

  for (let i = 0; i < logoGlyphs.length; i += 1) {
    logoGlyphs[i].classList.toggle('is-logo_expanded');
  }
}

/**
 * Expand the logo placed in the header at the mouseover event
 */
function expandLogo() {
  for (let i = 0; i < logoGlyphs.length; i += 1) {
    logoGlyphs[i].classList.add('is-logo_expanded');
  }
}

/**
 * Shrink the logo placed in the header at the mouseout event
 */
function shrinkLogo() {
  for (let i = 0; i < logoGlyphs.length; i += 1) {
    logoGlyphs[i].classList.remove('is-logo_expanded');
  }
}

if (!mobile) {
  logo.addEventListener('mouseover', expandLogo);
  logo.addEventListener('mouseout', shrinkLogo);
} else {
  openNav.addEventListener('touchstart', toggleNav);
  closeNav.addEventListener('touchstart', toggleNav);
}
