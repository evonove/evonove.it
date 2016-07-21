(function() {

    var sidebar = document.querySelector('.sidebar');
    var tags = document.querySelector('.sidebar-tags');

    if(!sidebar || !tags) {
        return;
    }

    var sidebarTop = $(sidebar).offset().top;

    $(window).scroll(function() {
        if($(window).scrollTop() > sidebarTop) {
            $(tags).addClass('is-fixed');
        } else {
            $(tags).removeClass('is-fixed');
        }
    });

})();
