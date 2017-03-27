(function() {

    var mobile;
    if (document.documentElement.clientWidth < 950) {
        mobile = 1;
    }

    var sidebar = document.querySelector('.sidebar');

    if (!sidebar) {
        return;
    }

    var tags = document.querySelector('.sidebar-box');
    var sidebarButton = document.querySelector('.sidebar-box-header');
    var tagList = document.querySelector('.sidebar-box-taglist');
    var arrow = document.querySelector('.sidebar-box-header-button');
    var tagSelected = document.querySelector('.sidebar-box-taglist li a.is-active');
    var sidebarTop = getOffsetTop(sidebar).top;

    if (!mobile) {
        window.addEventListener('scroll', fixTagList);
    } else {
        sidebarButton.addEventListener('click', toggleTagList);

        if (tagSelected) {
            tagListOpenAtRefresh();
        }
    }

    // Fix the tag list after scroll (after header disappeared)
    function fixTagList() {
        if ( (window.pageYOffset || document.documentElement.scrollTop) > sidebarTop ) {
            tags.classList.add('is-fixed');
        } else {
            tags.classList.remove('is-fixed');
        }
    }

    // The tag list is scrollable on mouseover if exceeds the height of its container
    tagList.addEventListener('mouseover', function() {
        this.classList.toggle('is-hover');
    });

    function toggleTagList() {
        tagList.classList.toggle('is-shown');
        arrow.classList.toggle('is-shown');
    }

    function tagListOpenAtRefresh() {
        tagList.classList.toggle('is-shown').classList.toggle('is-open');
        arrow.classList.toggle('is-shown').classList.toggle('is-open');
        sidebarButton.addEventListener('click', removeTagListTransition);
    }

    function removeTagListTransition() {
        tagList.classList.remove('is-open');
        arrow.classList.remove('is-open');
    }

    function getOffsetTop(element) {
        var rect = element.getBoundingClientRect();
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop };
    }
})();
