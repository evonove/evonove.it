(function(window, document) {
    'use strict';

    var splash = $('.splash');
    var logo = $('.splash-logo');
    var viewportHeight = $(window).height();

    if (!splash || !logo) {
        return;
    }

    // lock vh styles
    resetViewport();
    $(window).on('orientationchange', resetViewport);

    function resetViewport() {
        var margins = logo.css('margin');
        splash.height(viewportHeight);
        logo.css('margin', margins);
    }
})(window, document);
