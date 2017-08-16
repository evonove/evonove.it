// Hide post sharing when the articol is no more on the viewport.

const post = document.querySelector('.post');
const postSharing = document.querySelector('.post_share');

/**
 * Use Waypoint.js to hide the post sharing container.
 */
if (post) {
  new Waypoint({
    element: post,
    handler: function hidePostSharing(direction) {
      if (direction === 'down') {
        postSharing.classList.add('is-element_hidden');
      } else {
        postSharing.classList.remove('is-element_hidden');
      }
    },
    offset: 'bottom-in-view',
  });
}
