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

$(document).ready(function() {

    var mobile;
    /* this value is set with the $large media query */
    if ($(window).width() < 1128) {
        mobile = 1;
    }

    var person = $('.people-container-person');
    var description = $('.people-container-person-description');

    var personWidth = person.width();

    if (!mobile) {
        description.css({
            'left': personWidth * 1.5
        });

        person.hover(personHover);
    }

    if (mobile) {
        person.click(personClick);
    }

    function personHover() {
        var photo = $(this).find('.people-container-person-photo');
        photo.toggleClass('left');
    }

    function personClick() {
        var thisDescription = $(this).find('.people-container-person-description');
        thisDescription.toggleClass('fade-in');
        description.not(thisDescription).removeClass('fade-in');
    }
});

(function() {

    var mobile;
    if ($(window).width() < 950) {
        mobile = 1;
    }

    var figure;
    var image;
    var canvas;

    // Pixelation parameters
    var minRange = 0.08;
    var maxRange = 1.0;
    var stepPixel = 0.08;

    var projectsStatus = [];
    var lastClicked;
    var lastIndex;

    var projects = document.querySelectorAll('.projects-container-project');

    for (var i = 0; i < projects.length; i++) {
        projectsStatus[i] = false;

        if (!mobile) {
            projects[i].addEventListener('mouseenter', togglePixels);
            projects[i].addEventListener('mouseleave', togglePixels);
        }

        if (mobile) {
            projects[i].addEventListener('click', togglePixels);
        }
    }

    function togglePixels() {
        var projectContainer = document.querySelector('.projects-container');
        var index = Array.prototype.indexOf.call(projectContainer.children, this);

        // Pixelate this element
        projectsStatus[index] = !projectsStatus[index];
        toggleAnim(this, projectsStatus[index]);
        toggleDescription(this, projectsStatus[index]);

        // Depixelate last element
        if (lastClicked && lastClicked !== this && projectsStatus[lastIndex]) {
            projectsStatus[lastIndex] = !projectsStatus[lastIndex];
            toggleAnim(lastClicked, projectsStatus[lastIndex]);
            toggleDescription(lastClicked, projectsStatus[lastIndex]);
        }

        lastClicked = this;
        lastIndex = index;
    }

    function toggleAnim(node, pixelate) {
        var currentPixel = pixelate ? maxRange : minRange;

        var canvas = node.querySelector('.projects-container-project-figure-canvas');

        // Get the image child of project element
        var figure = node.querySelector('.projects-container-project-figure');
        var image = node.querySelector('.projects-container-project-figure-image');

        animPixel();

        function animPixel() {
            currentPixel += pixelate ? -stepPixel : stepPixel;

            if (currentPixel > maxRange) {
                currentPixel = maxRange;
            } else if (currentPixel < minRange) {
                currentPixel = minRange;
            }

            pixelation(currentPixel, image, canvas);

            if (currentPixel > minRange && currentPixel < maxRange) {
                requestAnimationFrame(animPixel);
            }
        }
    }

    function pixelation(pixelPercent, image, canvas) {
        // Get the dimensions of image
        var width = image.clientWidth;
        var height = image.clientHeight;

        canvas.width = width;
        canvas.height = height;

        // Grab the drawing context object. It's what lets us draw on the canvas
        var context = canvas.getContext('2d');

        // Use nearest-neighbor scaling when images are resized instead of the resizing algorithm to create blur
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        // Calculate the scaled dimension
        var scaledWidth = width * pixelPercent;
        var scaledHeight = height * pixelPercent;

        // Render image smaller.
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        // Stretch the smaller image onto larger context.
        context.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height);
    }

    function toggleDescription(node, show) {
        if (show) {
            $(node).find('.projects-container-project-darken').addClass('is_hover');
            $(node).find('.projects-container-project-cornice').addClass('is_hover');
            $(node).find('.projects-container-project-heading').addClass('is_hover');
            $(node).find('.projects-container-project-description').addClass('is_hover');
            $(node).find('.projects-container-project-figure-canvas').addClass('is_hover');
        } else {
            $(node).find('.projects-container-project-darken').removeClass('is_hover');
            $(node).find('.projects-container-project-cornice').removeClass('is_hover');
            $(node).find('.projects-container-project-heading').removeClass('is_hover');
            $(node).find('.projects-container-project-description').removeClass('is_hover');
            $(node).find('.projects-container-project-figure-canvas').removeClass('is_hover');
        }
    }
})();

$(".splash-cornice-scrolldown").click(function() {
    $('html, body').animate({
        scrollTop: $(".expertise").offset().top
    }, 1000);
});

// Elements to inject

var mySVGsToInject = document.querySelectorAll('img.js-inject-svg');

// Do the injection

SVGInjector(mySVGsToInject);
(function() {

    var mobile;
    if ($(window).width() < 950) {
        mobile = true;
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
    var sidebarTop = $(sidebar).offset().top;

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

(function () {
    'use strict';

    var texture = document.querySelector('.js-texture');
    var blogTexture = document.querySelector('.blog-plane_geometry');

    if (!texture) {
        return;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

    window.addEventListener( 'orientationchange', onOrientationChange, false );

    var renderer = new THREE.WebGLRenderer({
        alpha : true
    });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio((window.devicePixelRatio || 1) * 2);
    texture.appendChild( renderer.domElement );

    // set up lights
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    scene.fog = new THREE.Fog(0x242528, 0, 10);

    // generate plane
    var geometry = generateSimplexPlaneGeometry();
    var material = new THREE.MeshBasicMaterial( {morphTargets: true, color: 0xffffff, wireframe: true, side: THREE.DoubleSide } );
    var plane = new THREE.Mesh( geometry, material );

    var morphGeometry = generateSimplexPlaneGeometry();
    var vertices = [];
    for(var i = 0; i < morphGeometry.vertices.length; i++) {
        vertices.push(morphGeometry.vertices[i].clone());
    }
    geometry.morphTargets.push({ name: "targetPlane", vertices: vertices });
    plane.updateMorphTargets();

    scene.add( plane );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( 0, 1, 0 );
    scene.add( directionalLight );

    plane.scale.x = 6.0;
    plane.scale.z = 6.0;
    plane.scale.multiplyScalar(2);

    camera.position.z = 7;
    camera.position.y = 2;

    var step = 0.001;

    var running = true;
    window.addEventListener('scroll', function() {
        if(running) {
            running = false;
        } else if(window.scrollY === 0) {
            running = true;
            render();
        }
    });

    render();

    renderOnIos();

    function generateSimplexPlaneGeometry() {
        var width = 64;
        var height = 64;
        var geometry = new THREE.PlaneGeometry( 1, 1, width-1, height-1 );
        geometry.lookAt( new THREE.Vector3(0, 1, 0) );

        var simplex = new SimplexNoise();
        for( var i = 0; i < width; i++) {
            for( var j = 0; j < height; j++) {

                // generate noise
                var n = 0;
                var level = 3;
                n += (simplex.noise(i/level, j/level)/2 + 0.5) * 0.125;
                level *= 3;
                n += (simplex.noise(i/level, j/level)/2 + 0.5) * 0.25;
                level *= 2;
                n += (simplex.noise(i/level, j/level)/2 + 0.5) * 0.5;
                level *= 2;
                n += simplex.noise(i/level, j/level)/2 + 0.5;
                n /= 1+0.5+0.25+0.125;

                var v = geometry.vertices[i * width + j];
                v.y = n;
            }
        }
        return geometry;
    }

    function render() {
        // on mobile, stop animation at scroll e resume it when at top of page
        if(running) {
            requestAnimationFrame( render );
        }

        var current = plane.morphTargetInfluences[0];

        if (current > 1.0) {
            step = -0.001;
        } else if (current <= 0.0) {
            step = 0.001;
        }

        plane.morphTargetInfluences[0] += step;

        renderer.render(scene, camera);
    }

    function onOrientationChange() {
        setTimeout(onWindowResize, 200);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        requestAnimationFrame( render );
    }

    // detect if device operative system is iOS
    function renderOnIos() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if ( userAgent.match(/iPad/i) ) {
            $(blogTexture).addClass('js-tablet_up');
        } else if ( userAgent.match(/iPhone/i) || userAgent.match(/iPod/i) ) {
            $(blogTexture).addClass('js-phone_up');
        }
    }

})();

(function(window, document) {
    'use strict';

    var mobile;
    if ($(window).width() < 950) {
        mobile = 1;
    }

    var splash = $('.splash');

    if (!splash) {
        return;
    }

    if (mobile) {
        $(window).on('orientationchange', onOrientationChange);
    }

    function onOrientationChange() {
        setTimeout(resetViewport, 200);
    }

    function resetViewport() {
        var viewportHeight = $(window).height();
        splash.height(viewportHeight);
    }
})(window, document);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9qcy9tb3VzZS1waXhlbHMuanMiLCJjbGllbnQvanMvcGVvcGxlLmpzIiwiY2xpZW50L2pzL3Byb2plY3RzLXBpeGVsYXRpb24uanMiLCJjbGllbnQvanMvc2Nyb2xsLWRvd24uanMiLCJjbGllbnQvanMvc3ZnLWluamVjdGlvbnMuanMiLCJjbGllbnQvanMvYmxvZy10YWdzLmpzIiwiY2xpZW50L2pzL3RleHR1cmUzZC5qcyIsImNsaWVudC9qcy92aWV3cG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcblxuICAgIHZhciBleHBlcnRpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXhwZXJ0aXNlJyk7XG5cbiAgICBpZiAoIWV4cGVydGlzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG1vYmlsZTtcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5NTApIHtcbiAgICAgICAgbW9iaWxlID0gMTtcbiAgICB9XG5cbiAgICBpZiAoIW1vYmlsZSkge1xuICAgICAgICBwYXJ0aWNsZXNKUygnZXhwZXJ0aXNlLXBpeGVscycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICBcInBhcnRpY2xlc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IDI2MCxcbiAgICAgICAgICAgICAgICAgICAgXCJkZW5zaXR5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlX2FyZWFcIjogODAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjoge1xuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiI2ZmZmZmZlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInNoYXBlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiZWRnZVwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvbHlnb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuYl9zaWRlc1wiOiA1XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwib3BhY2l0eVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogMCxcbiAgICAgICAgICAgICAgICAgICAgXCJyYW5kb21cIjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJzaXplXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiAzLFxuICAgICAgICAgICAgICAgICAgICBcInJhbmRvbVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcImFuaW1cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwZWVkXCI6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNpemVfbWluXCI6IDAuMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3luY1wiOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcImxpbmVfbGlua2VkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJlbmFibGVcIjogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwic3RyYWlnaHRcIjogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImludGVyYWN0aXZpdHlcIjoge1xuICAgICAgICAgICAgICAgIFwiZGV0ZWN0X29uXCI6IFwiY2FudmFzXCIsXG4gICAgICAgICAgICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIm9uaG92ZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibW9kZVwiOiBcImJ1YmJsZVwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFwicmVzaXplXCI6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwibW9kZXNcIjoge1xuICAgICAgICAgICAgICAgICAgICBcImJ1YmJsZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpc3RhbmNlXCI6IDI1MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib3BhY2l0eVwiOiAwLjZcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJldGluYV9kZXRlY3RcIjogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBHcmFkdWFsbHkgZmFkZSBvdXQgb2YgcGl4ZWxzXG4gICAgICAgIHZhciBwaXhlbHMgPSAkKCcuZXhwZXJ0aXNlLXBpeGVscyBjYW52YXMnKTtcbiAgICAgICAgdmFyIG9wYWNpdHk7XG5cbiAgICAgICAgdmFyIHBpeGVsc0hlaWdodCA9ICQocGl4ZWxzKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgdmFyIG9wYXF1ZUJvdHRvbSA9ICQocGl4ZWxzKS5vZmZzZXQoKS50b3AgKyBwaXhlbHNIZWlnaHQ7XG4gICAgICAgIC8vIEFyZWEgb2YgZmFkZSBvdXRcbiAgICAgICAgdmFyIG9wYXF1ZUhlaWdodCA9IDYwMDtcbiAgICAgICAgdmFyIG9wYXF1ZVRvcCA9IG9wYXF1ZUJvdHRvbSAtIG9wYXF1ZUhlaWdodDtcblxuICAgICAgICAkKHBpeGVscykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBtb3VzZVkgPSBlLnBhZ2VZO1xuXG4gICAgICAgICAgICBpZiAobW91c2VZID49IG9wYXF1ZVRvcCAmJiBtb3VzZVkgPD0gb3BhcXVlQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgb3BhY2l0eSA9IDAuOCAtICgobW91c2VZLW9wYXF1ZVRvcCkvb3BhcXVlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAkKHBpeGVscykuY3NzKCdvcGFjaXR5Jywgb3BhY2l0eSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgICQocGl4ZWxzKS5jc3MoJ29wYWNpdHknLCBvcGFjaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59KSgpO1xuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgbW9iaWxlO1xuICAgIC8qIHRoaXMgdmFsdWUgaXMgc2V0IHdpdGggdGhlICRsYXJnZSBtZWRpYSBxdWVyeSAqL1xuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDExMjgpIHtcbiAgICAgICAgbW9iaWxlID0gMTtcbiAgICB9XG5cbiAgICB2YXIgcGVyc29uID0gJCgnLnBlb3BsZS1jb250YWluZXItcGVyc29uJyk7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gJCgnLnBlb3BsZS1jb250YWluZXItcGVyc29uLWRlc2NyaXB0aW9uJyk7XG5cbiAgICB2YXIgcGVyc29uV2lkdGggPSBwZXJzb24ud2lkdGgoKTtcblxuICAgIGlmICghbW9iaWxlKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uLmNzcyh7XG4gICAgICAgICAgICAnbGVmdCc6IHBlcnNvbldpZHRoICogMS41XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBlcnNvbi5ob3ZlcihwZXJzb25Ib3Zlcik7XG4gICAgfVxuXG4gICAgaWYgKG1vYmlsZSkge1xuICAgICAgICBwZXJzb24uY2xpY2socGVyc29uQ2xpY2spO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBlcnNvbkhvdmVyKCkge1xuICAgICAgICB2YXIgcGhvdG8gPSAkKHRoaXMpLmZpbmQoJy5wZW9wbGUtY29udGFpbmVyLXBlcnNvbi1waG90bycpO1xuICAgICAgICBwaG90by50b2dnbGVDbGFzcygnbGVmdCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBlcnNvbkNsaWNrKCkge1xuICAgICAgICB2YXIgdGhpc0Rlc2NyaXB0aW9uID0gJCh0aGlzKS5maW5kKCcucGVvcGxlLWNvbnRhaW5lci1wZXJzb24tZGVzY3JpcHRpb24nKTtcbiAgICAgICAgdGhpc0Rlc2NyaXB0aW9uLnRvZ2dsZUNsYXNzKCdmYWRlLWluJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLm5vdCh0aGlzRGVzY3JpcHRpb24pLnJlbW92ZUNsYXNzKCdmYWRlLWluJyk7XG4gICAgfVxufSk7XG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgbW9iaWxlO1xuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDk1MCkge1xuICAgICAgICBtb2JpbGUgPSAxO1xuICAgIH1cblxuICAgIHZhciBmaWd1cmU7XG4gICAgdmFyIGltYWdlO1xuICAgIHZhciBjYW52YXM7XG5cbiAgICAvLyBQaXhlbGF0aW9uIHBhcmFtZXRlcnNcbiAgICB2YXIgbWluUmFuZ2UgPSAwLjA4O1xuICAgIHZhciBtYXhSYW5nZSA9IDEuMDtcbiAgICB2YXIgc3RlcFBpeGVsID0gMC4wODtcblxuICAgIHZhciBwcm9qZWN0c1N0YXR1cyA9IFtdO1xuICAgIHZhciBsYXN0Q2xpY2tlZDtcbiAgICB2YXIgbGFzdEluZGV4O1xuXG4gICAgdmFyIHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3RzLWNvbnRhaW5lci1wcm9qZWN0Jyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb2plY3RzU3RhdHVzW2ldID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKCFtb2JpbGUpIHtcbiAgICAgICAgICAgIHByb2plY3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0b2dnbGVQaXhlbHMpO1xuICAgICAgICAgICAgcHJvamVjdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRvZ2dsZVBpeGVscyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9iaWxlKSB7XG4gICAgICAgICAgICBwcm9qZWN0c1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVBpeGVscyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVQaXhlbHMoKSB7XG4gICAgICAgIHZhciBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvbnRhaW5lcicpO1xuICAgICAgICB2YXIgaW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKHByb2plY3RDb250YWluZXIuY2hpbGRyZW4sIHRoaXMpO1xuXG4gICAgICAgIC8vIFBpeGVsYXRlIHRoaXMgZWxlbWVudFxuICAgICAgICBwcm9qZWN0c1N0YXR1c1tpbmRleF0gPSAhcHJvamVjdHNTdGF0dXNbaW5kZXhdO1xuICAgICAgICB0b2dnbGVBbmltKHRoaXMsIHByb2plY3RzU3RhdHVzW2luZGV4XSk7XG4gICAgICAgIHRvZ2dsZURlc2NyaXB0aW9uKHRoaXMsIHByb2plY3RzU3RhdHVzW2luZGV4XSk7XG5cbiAgICAgICAgLy8gRGVwaXhlbGF0ZSBsYXN0IGVsZW1lbnRcbiAgICAgICAgaWYgKGxhc3RDbGlja2VkICYmIGxhc3RDbGlja2VkICE9PSB0aGlzICYmIHByb2plY3RzU3RhdHVzW2xhc3RJbmRleF0pIHtcbiAgICAgICAgICAgIHByb2plY3RzU3RhdHVzW2xhc3RJbmRleF0gPSAhcHJvamVjdHNTdGF0dXNbbGFzdEluZGV4XTtcbiAgICAgICAgICAgIHRvZ2dsZUFuaW0obGFzdENsaWNrZWQsIHByb2plY3RzU3RhdHVzW2xhc3RJbmRleF0pO1xuICAgICAgICAgICAgdG9nZ2xlRGVzY3JpcHRpb24obGFzdENsaWNrZWQsIHByb2plY3RzU3RhdHVzW2xhc3RJbmRleF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGFzdENsaWNrZWQgPSB0aGlzO1xuICAgICAgICBsYXN0SW5kZXggPSBpbmRleDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVBbmltKG5vZGUsIHBpeGVsYXRlKSB7XG4gICAgICAgIHZhciBjdXJyZW50UGl4ZWwgPSBwaXhlbGF0ZSA/IG1heFJhbmdlIDogbWluUmFuZ2U7XG5cbiAgICAgICAgdmFyIGNhbnZhcyA9IG5vZGUucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvbnRhaW5lci1wcm9qZWN0LWZpZ3VyZS1jYW52YXMnKTtcblxuICAgICAgICAvLyBHZXQgdGhlIGltYWdlIGNoaWxkIG9mIHByb2plY3QgZWxlbWVudFxuICAgICAgICB2YXIgZmlndXJlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY29udGFpbmVyLXByb2plY3QtZmlndXJlJyk7XG4gICAgICAgIHZhciBpbWFnZSA9IG5vZGUucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvbnRhaW5lci1wcm9qZWN0LWZpZ3VyZS1pbWFnZScpO1xuXG4gICAgICAgIGFuaW1QaXhlbCgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFuaW1QaXhlbCgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQaXhlbCArPSBwaXhlbGF0ZSA/IC1zdGVwUGl4ZWwgOiBzdGVwUGl4ZWw7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50UGl4ZWwgPiBtYXhSYW5nZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQaXhlbCA9IG1heFJhbmdlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGl4ZWwgPCBtaW5SYW5nZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQaXhlbCA9IG1pblJhbmdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwaXhlbGF0aW9uKGN1cnJlbnRQaXhlbCwgaW1hZ2UsIGNhbnZhcyk7XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50UGl4ZWwgPiBtaW5SYW5nZSAmJiBjdXJyZW50UGl4ZWwgPCBtYXhSYW5nZSkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltUGl4ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGl4ZWxhdGlvbihwaXhlbFBlcmNlbnQsIGltYWdlLCBjYW52YXMpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBkaW1lbnNpb25zIG9mIGltYWdlXG4gICAgICAgIHZhciB3aWR0aCA9IGltYWdlLmNsaWVudFdpZHRoO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gaW1hZ2UuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIC8vIEdyYWIgdGhlIGRyYXdpbmcgY29udGV4dCBvYmplY3QuIEl0J3Mgd2hhdCBsZXRzIHVzIGRyYXcgb24gdGhlIGNhbnZhc1xuICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgIC8vIFVzZSBuZWFyZXN0LW5laWdoYm9yIHNjYWxpbmcgd2hlbiBpbWFnZXMgYXJlIHJlc2l6ZWQgaW5zdGVhZCBvZiB0aGUgcmVzaXppbmcgYWxnb3JpdGhtIHRvIGNyZWF0ZSBibHVyXG4gICAgICAgIGNvbnRleHQud2Via2l0SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnRleHQubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIHNjYWxlZCBkaW1lbnNpb25cbiAgICAgICAgdmFyIHNjYWxlZFdpZHRoID0gd2lkdGggKiBwaXhlbFBlcmNlbnQ7XG4gICAgICAgIHZhciBzY2FsZWRIZWlnaHQgPSBoZWlnaHQgKiBwaXhlbFBlcmNlbnQ7XG5cbiAgICAgICAgLy8gUmVuZGVyIGltYWdlIHNtYWxsZXIuXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBzY2FsZWRXaWR0aCwgc2NhbGVkSGVpZ2h0KTtcblxuICAgICAgICAvLyBTdHJldGNoIHRoZSBzbWFsbGVyIGltYWdlIG9udG8gbGFyZ2VyIGNvbnRleHQuXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGNhbnZhcywgMCwgMCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGVzY3JpcHRpb24obm9kZSwgc2hvdykge1xuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgJChub2RlKS5maW5kKCcucHJvamVjdHMtY29udGFpbmVyLXByb2plY3QtZGFya2VuJykuYWRkQ2xhc3MoJ2lzX2hvdmVyJyk7XG4gICAgICAgICAgICAkKG5vZGUpLmZpbmQoJy5wcm9qZWN0cy1jb250YWluZXItcHJvamVjdC1jb3JuaWNlJykuYWRkQ2xhc3MoJ2lzX2hvdmVyJyk7XG4gICAgICAgICAgICAkKG5vZGUpLmZpbmQoJy5wcm9qZWN0cy1jb250YWluZXItcHJvamVjdC1oZWFkaW5nJykuYWRkQ2xhc3MoJ2lzX2hvdmVyJyk7XG4gICAgICAgICAgICAkKG5vZGUpLmZpbmQoJy5wcm9qZWN0cy1jb250YWluZXItcHJvamVjdC1kZXNjcmlwdGlvbicpLmFkZENsYXNzKCdpc19ob3ZlcicpO1xuICAgICAgICAgICAgJChub2RlKS5maW5kKCcucHJvamVjdHMtY29udGFpbmVyLXByb2plY3QtZmlndXJlLWNhbnZhcycpLmFkZENsYXNzKCdpc19ob3ZlcicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChub2RlKS5maW5kKCcucHJvamVjdHMtY29udGFpbmVyLXByb2plY3QtZGFya2VuJykucmVtb3ZlQ2xhc3MoJ2lzX2hvdmVyJyk7XG4gICAgICAgICAgICAkKG5vZGUpLmZpbmQoJy5wcm9qZWN0cy1jb250YWluZXItcHJvamVjdC1jb3JuaWNlJykucmVtb3ZlQ2xhc3MoJ2lzX2hvdmVyJyk7XG4gICAgICAgICAgICAkKG5vZGUpLmZpbmQoJy5wcm9qZWN0cy1jb250YWluZXItcHJvamVjdC1oZWFkaW5nJykucmVtb3ZlQ2xhc3MoJ2lzX2hvdmVyJyk7XG4gICAgICAgICAgICAkKG5vZGUpLmZpbmQoJy5wcm9qZWN0cy1jb250YWluZXItcHJvamVjdC1kZXNjcmlwdGlvbicpLnJlbW92ZUNsYXNzKCdpc19ob3ZlcicpO1xuICAgICAgICAgICAgJChub2RlKS5maW5kKCcucHJvamVjdHMtY29udGFpbmVyLXByb2plY3QtZmlndXJlLWNhbnZhcycpLnJlbW92ZUNsYXNzKCdpc19ob3ZlcicpO1xuICAgICAgICB9XG4gICAgfVxufSkoKTtcbiIsIiQoXCIuc3BsYXNoLWNvcm5pY2Utc2Nyb2xsZG93blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJChcIi5leHBlcnRpc2VcIikub2Zmc2V0KCkudG9wXG4gICAgfSwgMTAwMCk7XG59KTtcbiIsIi8vIEVsZW1lbnRzIHRvIGluamVjdFxuXG52YXIgbXlTVkdzVG9JbmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcuanMtaW5qZWN0LXN2ZycpO1xuXG4vLyBEbyB0aGUgaW5qZWN0aW9uXG5cblNWR0luamVjdG9yKG15U1ZHc1RvSW5qZWN0KTsiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgbW9iaWxlO1xuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDk1MCkge1xuICAgICAgICBtb2JpbGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcblxuICAgIGlmICghc2lkZWJhcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhci1ib3gnKTtcbiAgICB2YXIgc2lkZWJhckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWJveC1oZWFkZXInKTtcbiAgICB2YXIgdGFnTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWJveC10YWdsaXN0Jyk7XG4gICAgdmFyIGFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItYm94LWhlYWRlci1idXR0b24nKTtcbiAgICB2YXIgdGFnU2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhci1ib3gtdGFnbGlzdCBsaSBhLmlzLWFjdGl2ZScpO1xuICAgIHZhciBzaWRlYmFyVG9wID0gJChzaWRlYmFyKS5vZmZzZXQoKS50b3A7XG5cbiAgICBpZiAoIW1vYmlsZSkge1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZpeFRhZ0xpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoc2lkZWJhckJ1dHRvbikuY2xpY2sodG9nZ2xlVGFnTGlzdCk7XG5cbiAgICAgICAgLy8gSWYgYSB0YWcgaXMgc2VsZWN0ZWQsIHRhZyBsaXN0IHJlbWFpbnMgb3BlbiB3aGVuIHVzZXIgc2VsZWN0cyBvdGhlciB0YWdzLlxuICAgICAgICBpZiAodGFnU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRhZ0xpc3RPcGVuQXRSZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXhUYWdMaXN0KCkge1xuICAgICAgICBpZiAoICQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNpZGViYXJUb3AgKSB7XG4gICAgICAgICAgICAkKHRhZ3MpLmFkZENsYXNzKCdpcy1maXhlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0YWdzKS5yZW1vdmVDbGFzcygnaXMtZml4ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZVRhZ0xpc3QoKSB7XG4gICAgICAgICQodGFnTGlzdCkudG9nZ2xlQ2xhc3MoJ2lzLXNob3duJyk7XG4gICAgICAgICQoYXJyb3cpLnRvZ2dsZUNsYXNzKCdpcy1zaG93bicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRhZ0xpc3RPcGVuQXRSZWZyZXNoKCkge1xuICAgICAgICAkKHRhZ0xpc3QpLnRvZ2dsZUNsYXNzKCdpcy1zaG93bicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoYXJyb3cpLnRvZ2dsZUNsYXNzKCdpcy1zaG93bicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoc2lkZWJhckJ1dHRvbikuY2xpY2socmVtb3ZlVGFnTGlzdFRyYW5zaXRpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhZ0xpc3RUcmFuc2l0aW9uKCkge1xuICAgICAgICAkKHRhZ0xpc3QpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICQoYXJyb3cpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgfVxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIHRleHR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGV4dHVyZScpO1xuICAgIHZhciBibG9nVGV4dHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLXBsYW5lX2dlb21ldHJ5Jyk7XG5cbiAgICBpZiAoIXRleHR1cmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIHZhciBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDQ1LCB3aW5kb3cuaW5uZXJXaWR0aC93aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMCApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIG9uT3JpZW50YXRpb25DaGFuZ2UsIGZhbHNlICk7XG5cbiAgICB2YXIgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7XG4gICAgICAgIGFscGhhIDogdHJ1ZVxuICAgIH0pO1xuICAgIHJlbmRlcmVyLnNldFNpemUoIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcbiAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxKSAqIDIpO1xuICAgIHRleHR1cmUuYXBwZW5kQ2hpbGQoIHJlbmRlcmVyLmRvbUVsZW1lbnQgKTtcblxuICAgIC8vIHNldCB1cCBsaWdodHNcbiAgICB2YXIgbGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KCAweDQwNDA0MCApOyAvLyBzb2Z0IHdoaXRlIGxpZ2h0XG4gICAgc2NlbmUuYWRkKCBsaWdodCApO1xuICAgIHNjZW5lLmZvZyA9IG5ldyBUSFJFRS5Gb2coMHgyNDI1MjgsIDAsIDEwKTtcblxuICAgIC8vIGdlbmVyYXRlIHBsYW5lXG4gICAgdmFyIGdlb21ldHJ5ID0gZ2VuZXJhdGVTaW1wbGV4UGxhbmVHZW9tZXRyeSgpO1xuICAgIHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCgge21vcnBoVGFyZ2V0czogdHJ1ZSwgY29sb3I6IDB4ZmZmZmZmLCB3aXJlZnJhbWU6IHRydWUsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSApO1xuICAgIHZhciBwbGFuZSA9IG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcblxuICAgIHZhciBtb3JwaEdlb21ldHJ5ID0gZ2VuZXJhdGVTaW1wbGV4UGxhbmVHZW9tZXRyeSgpO1xuICAgIHZhciB2ZXJ0aWNlcyA9IFtdO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtb3JwaEdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZlcnRpY2VzLnB1c2gobW9ycGhHZW9tZXRyeS52ZXJ0aWNlc1tpXS5jbG9uZSgpKTtcbiAgICB9XG4gICAgZ2VvbWV0cnkubW9ycGhUYXJnZXRzLnB1c2goeyBuYW1lOiBcInRhcmdldFBsYW5lXCIsIHZlcnRpY2VzOiB2ZXJ0aWNlcyB9KTtcbiAgICBwbGFuZS51cGRhdGVNb3JwaFRhcmdldHMoKTtcblxuICAgIHNjZW5lLmFkZCggcGxhbmUgKTtcblxuICAgIHZhciBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZmZmZmZmLCAwLjUgKTtcbiAgICBkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCggMCwgMSwgMCApO1xuICAgIHNjZW5lLmFkZCggZGlyZWN0aW9uYWxMaWdodCApO1xuXG4gICAgcGxhbmUuc2NhbGUueCA9IDYuMDtcbiAgICBwbGFuZS5zY2FsZS56ID0gNi4wO1xuICAgIHBsYW5lLnNjYWxlLm11bHRpcGx5U2NhbGFyKDIpO1xuXG4gICAgY2FtZXJhLnBvc2l0aW9uLnogPSA3O1xuICAgIGNhbWVyYS5wb3NpdGlvbi55ID0gMjtcblxuICAgIHZhciBzdGVwID0gMC4wMDE7XG5cbiAgICB2YXIgcnVubmluZyA9IHRydWU7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihydW5uaW5nKSB7XG4gICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZih3aW5kb3cuc2Nyb2xsWSA9PT0gMCkge1xuICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVuZGVyKCk7XG5cbiAgICByZW5kZXJPbklvcygpO1xuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVTaW1wbGV4UGxhbmVHZW9tZXRyeSgpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gNjQ7XG4gICAgICAgIHZhciBoZWlnaHQgPSA2NDtcbiAgICAgICAgdmFyIGdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoIDEsIDEsIHdpZHRoLTEsIGhlaWdodC0xICk7XG4gICAgICAgIGdlb21ldHJ5Lmxvb2tBdCggbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCkgKTtcblxuICAgICAgICB2YXIgc2ltcGxleCA9IG5ldyBTaW1wbGV4Tm9pc2UoKTtcbiAgICAgICAgZm9yKCB2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IoIHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBub2lzZVxuICAgICAgICAgICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSAzO1xuICAgICAgICAgICAgICAgIG4gKz0gKHNpbXBsZXgubm9pc2UoaS9sZXZlbCwgai9sZXZlbCkvMiArIDAuNSkgKiAwLjEyNTtcbiAgICAgICAgICAgICAgICBsZXZlbCAqPSAzO1xuICAgICAgICAgICAgICAgIG4gKz0gKHNpbXBsZXgubm9pc2UoaS9sZXZlbCwgai9sZXZlbCkvMiArIDAuNSkgKiAwLjI1O1xuICAgICAgICAgICAgICAgIGxldmVsICo9IDI7XG4gICAgICAgICAgICAgICAgbiArPSAoc2ltcGxleC5ub2lzZShpL2xldmVsLCBqL2xldmVsKS8yICsgMC41KSAqIDAuNTtcbiAgICAgICAgICAgICAgICBsZXZlbCAqPSAyO1xuICAgICAgICAgICAgICAgIG4gKz0gc2ltcGxleC5ub2lzZShpL2xldmVsLCBqL2xldmVsKS8yICsgMC41O1xuICAgICAgICAgICAgICAgIG4gLz0gMSswLjUrMC4yNSswLjEyNTtcblxuICAgICAgICAgICAgICAgIHZhciB2ID0gZ2VvbWV0cnkudmVydGljZXNbaSAqIHdpZHRoICsgal07XG4gICAgICAgICAgICAgICAgdi55ID0gbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAvLyBvbiBtb2JpbGUsIHN0b3AgYW5pbWF0aW9uIGF0IHNjcm9sbCBlIHJlc3VtZSBpdCB3aGVuIGF0IHRvcCBvZiBwYWdlXG4gICAgICAgIGlmKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggcmVuZGVyICk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3VycmVudCA9IHBsYW5lLm1vcnBoVGFyZ2V0SW5mbHVlbmNlc1swXTtcblxuICAgICAgICBpZiAoY3VycmVudCA+IDEuMCkge1xuICAgICAgICAgICAgc3RlcCA9IC0wLjAwMTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50IDw9IDAuMCkge1xuICAgICAgICAgICAgc3RlcCA9IDAuMDAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxhbmUubW9ycGhUYXJnZXRJbmZsdWVuY2VzWzBdICs9IHN0ZXA7XG5cbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uT3JpZW50YXRpb25DaGFuZ2UoKSB7XG4gICAgICAgIHNldFRpbWVvdXQob25XaW5kb3dSZXNpemUsIDIwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHJlbmRlciApO1xuICAgIH1cblxuICAgIC8vIGRldGVjdCBpZiBkZXZpY2Ugb3BlcmF0aXZlIHN5c3RlbSBpcyBpT1NcbiAgICBmdW5jdGlvbiByZW5kZXJPbklvcygpIHtcbiAgICAgICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgbmF2aWdhdG9yLnZlbmRvciB8fCB3aW5kb3cub3BlcmE7XG5cbiAgICAgICAgaWYgKCB1c2VyQWdlbnQubWF0Y2goL2lQYWQvaSkgKSB7XG4gICAgICAgICAgICAkKGJsb2dUZXh0dXJlKS5hZGRDbGFzcygnanMtdGFibGV0X3VwJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpIHx8IHVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKSApIHtcbiAgICAgICAgICAgICQoYmxvZ1RleHR1cmUpLmFkZENsYXNzKCdqcy1waG9uZV91cCcpO1xuICAgICAgICB9XG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgbW9iaWxlO1xuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDk1MCkge1xuICAgICAgICBtb2JpbGUgPSAxO1xuICAgIH1cblxuICAgIHZhciBzcGxhc2ggPSAkKCcuc3BsYXNoJyk7XG5cbiAgICBpZiAoIXNwbGFzaCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1vYmlsZSkge1xuICAgICAgICAkKHdpbmRvdykub24oJ29yaWVudGF0aW9uY2hhbmdlJywgb25PcmllbnRhdGlvbkNoYW5nZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25PcmllbnRhdGlvbkNoYW5nZSgpIHtcbiAgICAgICAgc2V0VGltZW91dChyZXNldFZpZXdwb3J0LCAyMDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0Vmlld3BvcnQoKSB7XG4gICAgICAgIHZhciB2aWV3cG9ydEhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgICAgc3BsYXNoLmhlaWdodCh2aWV3cG9ydEhlaWdodCk7XG4gICAgfVxufSkod2luZG93LCBkb2N1bWVudCk7XG4iXX0=
