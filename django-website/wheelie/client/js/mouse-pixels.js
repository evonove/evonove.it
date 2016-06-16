(function() {
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
                    "opacity": 0.6,
                }
            }
        },
        "retina_detect": true
    });
})();
