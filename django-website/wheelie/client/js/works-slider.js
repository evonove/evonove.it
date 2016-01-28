$(document).ready(function() {

    // caching
    var slider = $('.works-container-project-slider');
    var slidesBox = $('.works-container-project-slider ul');
    var slide = $('.works-container-project-slider ul li');
    var slideWidth = slide.width();

    var carouselBox = $('.works-container-projectimage-carousel');
    var carouselSlidesBox = $('.works-container-projectimage-carousel-boxslides');
    var carouselSlide = $('.works-container-projectimage-carousel-boxslides figure');
    var carosulSlideWidth = carouselSlide.width();

    // options
    var currentPosition = 0;
    var numItems = slide.length;

    var currentPositionCar = 0;
    var numImages = carouselSlide.length;

    var left = $('.works-container-project-navigator-left');
    var right = $('.works-container-project-navigator-right');

    // make each slide as large as slider
    slide.css({
        'display': 'block',
        'width': slider.width()
    });

    carouselSlide.css({
        'display': 'block',
        'width': carouselBox.width()
    });

    // make slides box as large as all slides
    slidesBox.css({
        'width': slider.width() * numItems + 'px'
    });

    carouselSlidesBox.css({
        'width': carouselBox.width() * numImages + 'px'
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
            currentPositionCar -=1;
            carouselSlidesBox.css({
                'left': currentPositionCar * carosulSlideWidth + 'px'
            })
        }
    }

    function slideRight() {
        if (currentPosition < numItems - 1) {
            currentPosition += 1;
            slidesBox.css({
                'left': currentPosition * -slideWidth + 'px'
            });
            currentPositionCar +=1;
            carouselSlidesBox.css({
                'left': currentPositionCar * -carosulSlideWidth + 'px'
            })
        }
    }
});
