// Reveal every article (figure plus text) while scrolling.

const articles = document.querySelectorAll('.js-reveal_article');

/**
 * Use Waypoint.js to reveal picture and text couple.
 */
function revealArticle() {
  for (let i = 0; i < articles.length; i += 1) {
    this.element.classList.add('is-element_revealed');
    this.destroy();
  }
}

for (let i = 0; i < articles.length; i += 1) {
  new Waypoint({
    element: articles[i],
    handler: revealArticle,
    offset: '76.999%',
  });
}
