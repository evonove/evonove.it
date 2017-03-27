(function() {
  var scrollButton = document.querySelector('.splash-cornice-scrolldown');
  var expertise = document.querySelector('.expertise');

  if(!expertise) {
    return;
  }

  scrollButton.addEventListener('click', scrollToExpertise);

  function scrollToExpertise() {
    window.smoothScroll(expertise, 1000);
  }
}());
