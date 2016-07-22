(function() {

    var mobile;
    if ($(window).width() < 950) {
        mobile = true;
    }

    var sidebar = document.querySelector('.sidebar');
    var tags = document.querySelector('.sidebar-box');
    var sidebarButton = document.querySelector('.sidebar-box-header');
    var tagList = document.querySelector('.sidebar-box-taglist');
    var arrow = document.querySelector('.sidebar-box-header-button');
    var tagSelected = document.querySelector('.sidebar-box-taglist li a.is-active');

    var sidebarTop = $(sidebar).offset().top;

    if (!sidebar) {
        return;
    }

    if (!mobile) {
        $(window).scroll(fixTagList);
    } else {
        $(sidebarButton).click(toggleTagList);

        // If a tag is selected, tag list remains open when user selects other tags.
        if (tagSelected) {
            tagListOpenAtRefresh();
        }
    }

    function fixTagList() {
        if ( $(window).scrollTop() > sidebarTop ) {
            $(tags).addClass('is-fixed');
        } else {
            $(tags).removeClass('is-fixed');
        }
    }

    function toggleTagList() {
        $(tagList).toggleClass('is-shown');
        $(arrow).toggleClass('is-shown');
    }

    function tagListOpenAtRefresh() {
        $(tagList).toggleClass('is-shown').toggleClass('is-open');
        $(arrow).toggleClass('is-shown').toggleClass('is-open');
        $(sidebarButton).click(removeTagListTransition);
    }

    function removeTagListTransition() {
        $(tagList).removeClass('is-open');
        $(arrow).removeClass('is-open');
    }
})();
