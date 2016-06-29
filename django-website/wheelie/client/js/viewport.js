(function(window, document) {
    'use strict';

    var mobile;
    if ($(window).width() < 950) {
        mobile = 1;
    }

    var splash = $('.splash');

    if (!splash) {
        return;
    }

    if (mobile) {
        $(window).on('orientationchange', onOrientationChange);
    }

    function onOrientationChange() {
        setTimeout(resetViewport, 200);
    }

    function resetViewport() {
        var viewportHeight = $(window).height();
        splash.height(viewportHeight);
    }
})(window, document);
