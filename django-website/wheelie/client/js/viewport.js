(function(window, document) {
    'use strict';

    var mobile;
    if ($(window).width() < 950) {
        mobile = 1;
    }

    var splash = $('.splash');
    var logo = $('.splash-logo');
    var viewportHeight = $(window).height();

    if (!splash || !logo) {
        return;
    }

    if (mobile) {
        // lock vh styles
        resetViewport();
        $(window).on('orientationchange', resetViewport);

        resetViewport();
    }

    function resetViewport() {
        var margins = logo.css('margin');
        splash.height(viewportHeight);
        logo.css('margin', margins);
    }
})(window, document);
