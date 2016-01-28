$(document).ready(function() {

    // caching
    var slider = $('.works-container-project-slider');
    var slidesBox = $('.works-container-project-slider ul');
    var slide = $('.works-container-project-slider ul li');
    var slideWidth = slide.width();

    // options
    var currentPosition = 0;
    var numItems = slide.length;

    var left = $('.works-container-project-navigator-left');
    var right = $('.works-container-project-navigator-right');

    // make each slide as large as slider
    slide.css({
        'display': 'block',
        'width': slider.width()
    });

    // make slides box as large as all slides
    slidesBox.css({
        'width': slider.width() * slide.length + 'px'
    });

    // navigate the slides
    left.click(slideLeft);
    right.click(slideRight);

    function slideLeft() {
        if (currentPosition > 0) {
            currentPosition -= 1;
            slidesBox.css({
                'left': currentPosition * slideWidth + 'px'
            });
        }
    }

    function slideRight() {
        if (currentPosition < numItems - 1) {
            currentPosition += 1;
            slidesBox.css({
                'left': currentPosition * -slideWidth + 'px'
            });
        }
    }
});
