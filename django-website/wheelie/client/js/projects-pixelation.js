(function() {

    var mobile;
    if (document.documentElement.clientWidth < 1025) {
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
            node.querySelector('.projects-container-project-darken').classList.add('is_hover');
            node.querySelector('.projects-container-project-cornice').classList.add('is_hover');
            node.querySelector('.projects-container-project-heading').classList.add('is_hover');
            node.querySelector('.projects-container-project-description').classList.add('is_hover');
            node.querySelector('.projects-container-project-figure-canvas').classList.add('is_hover');
        } else {
            node.querySelector('.projects-container-project-darken').classList.remove('is_hover');
            node.querySelector('.projects-container-project-cornice').classList.remove('is_hover');
            node.querySelector('.projects-container-project-heading').classList.remove('is_hover');
            node.querySelector('.projects-container-project-description').classList.remove('is_hover');
            node.querySelector('.projects-container-project-figure-canvas').classList.remove('is_hover');
        }
    }
})();
