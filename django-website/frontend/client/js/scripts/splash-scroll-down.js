// Hide scroll down call to action after user has scrolled the home page for
// the first time.

const scrollCall = document.querySelector('.scrolldown');
const nextSection = document.querySelector('.services');

function hideScrollCall() {
  scrollCall.classList.add('has-scrolled');
}

if (scrollCall) {
  new Waypoint({
    element: nextSection,
    handler: hideScrollCall,
    offset: '99%',
  });
}
