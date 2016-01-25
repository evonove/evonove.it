$(document).ready(function() {

    var mobile;
    if ($(window).width() < 950) {
        mobile = 1;
    }

    var person = $('.people-container-person');
    var description = $('.people-container-person-description');

    var personWidth = person.width();

    if (!mobile) {
        description.css({
            'left': personWidth * 1.5
        });
    }

    if (mobile) {
        description.click(function() {
            $(this).toggleClass('fade-in');
            description.not(this).removeClass('fade-in');
        });
    }
});