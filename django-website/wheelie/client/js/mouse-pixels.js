(function() {

    var expertise = document.querySelector('.expertise');

    if (!expertise) {
        return;
    }

    var mobile;
    if ($(window).width() < 950) {
        mobile = 1;
    }

    if (!mobile) {
        particlesJS('expertise-pixels',
            {
            "particles": {
                "number": {
                    "value": 260,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "edge",
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0,
                    "random": true
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 4,
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "straight": true
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 250,
                        "size": 10,
                        "opacity": 0.6
                    }
                }
            },
            "retina_detect": true
        });

        // Gradually fade out of pixels
        var pixels = $('.expertise-pixels canvas');
        var opacity;

        var pixelsHeight = $(pixels).outerHeight(true);
        var opaqueBottom = $(pixels).offset().top + pixelsHeight;
        // Area of fade out
        var opaqueHeight = 600;
        var opaqueTop = opaqueBottom - opaqueHeight;

        $(pixels).on('mousemove', function(e) {
            var mouseY = e.pageY;

            if (mouseY >= opaqueTop && mouseY <= opaqueBottom) {
                opacity = 0.8 - ((mouseY-opaqueTop)/opaqueHeight);
                $(pixels).css('opacity', opacity);
            } else {
                opacity = 1;
                $(pixels).css('opacity', opacity);
            }
        });
    }

})();
