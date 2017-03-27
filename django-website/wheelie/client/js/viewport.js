(function(window, document) {
    'use strict';

    var mobile;
    if (document.documentElement.clientWidth < 950) {
        mobile = 1;
    }

    var splash = document.querySelector('.splash');

    if (!splash) {
        return;
    }

    if (mobile) {
        window.addEventListener('orientationchange', onOrientationChange);
    }

    function onOrientationChange() {
        setTimeout(resetViewport, 200);
    }

    function resetViewport() {
        var viewportHeight = document.documentElement.clientHeight;
        splash.style.height = viewportHeight;
    }
})(window, document);
