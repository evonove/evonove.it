$(document).ready(function() {

    var person = $('.people-container-person');
    var description = $('.people-container-person-description');

    var personWidth = person.width();

    description.css({
        'left': personWidth * 1.618
    });

});