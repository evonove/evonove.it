(function() {

    var expertise = document.querySelector('.expertise');

    if (!expertise) {
        return;
    }

    var mobile;
    if (document.documentElement.clientWidth < 950) {
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
        var pixels = document.querySelector('.expertise-pixels canvas');
        var opacity;

        var pixelsHeight = pixels.offsetHeight;
        var opaqueOffset = getOffsetTop(pixels);
        var opaqueBottom = opaqueOffset.top + pixelsHeight;

        // Area of fade out
        var opaqueHeight = 600;
        var opaqueTop = opaqueBottom - opaqueHeight;

        pixels.addEventListener('mousemove', function(e) {
            var mouseY = e.pageY;

            if (mouseY >= opaqueTop && mouseY <= opaqueBottom) {
                opacity = 0.8 - ((mouseY-opaqueTop) / opaqueHeight);
                pixels.style.opacity = opacity;
            } else {
                opacity = 1;
                pixels.style.opacity = opacity;
            }
        });
    }

    function getOffsetTop(element) {
        var rect = element.getBoundingClientRect();
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop };
    }

})();
