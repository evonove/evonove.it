// Expand Evonove logo at mouseover event

const logo = document.querySelector('.header-main_interactions-logo');
const logoGlyphs = document.querySelectorAll('.js-expand_logo');
const openNavButton = document.querySelector('.open_nav');
const closeNavButton = document.querySelector('.close_nav');

let mobile;

if (window.innerWidth <= 980) {
  mobile = true;
}

/**
 * Expand the logo placed in the header at the mouseover event or when user
 * touches the Menu button
 */
function expandLogo() {
  for (let i = 0; i < logoGlyphs.length; i += 1) {
    logoGlyphs[i].classList.add('is-logo_expanded');
  }
}

/**
 * Shrink the logo placed in the header at the mouseout event or when user
 * touches the Close menu button
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
  openNavButton.addEventListener('touchstart', expandLogo);
  closeNavButton.addEventListener('touchstart', shrinkLogo);
}
