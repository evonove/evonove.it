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
            projects[i].addEventListener('mouseenter', showDescription);
            projects[i].addEventListener('mouseleave', togglePixels);
            projects[i].addEventListener('mouseleave', hideDescription);
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

        // Depixelate last element
        if (lastClicked && lastClicked !== this && projectsStatus[lastIndex]) {
            projectsStatus[lastIndex] = !projectsStatus[lastIndex];
            toggleAnim(lastClicked, projectsStatus[lastIndex]);
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

        // This is what gives us that blocky pixel styling, rather than a blend between pixels
        canvas.style.cssText =  'image-rendering: optimizeSpeed;' + // FireFox < 6.0
                                'image-rendering: -moz-crisp-edges;' + // FireFox
                                'image-rendering: -o-crisp-edges;' +  // Opera
                                'image-rendering: -webkit-crisp-edges;' + // Chrome
                                'image-rendering: crisp-edges;' + // Chrome
                                'image-rendering: -webkit-optimize-contrast;' + // Safari
                                'image-rendering: pixelated; ' + // Future browsers
                                '-ms-interpolation-mode: nearest-neighbor;'; // IE

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

    function showDescription() {
        $(this).find('.projects-container-project-heading').addClass('is_hover');
        $(this).find('.projects-container-project-description').addClass('is_hover');
        $(this).find('.projects-container-project-figure-canvas').addClass('is_hover');
    }

    function hideDescription() {
        $(this).find('.projects-container-project-heading').removeClass('is_hover');
        $(this).find('.projects-container-project-description').removeClass('is_hover');
        $(this).find('.projects-container-project-figure-canvas').removeClass('is_hover');
    }

})();
