(function() {

    var project = document.querySelectorAll('.projects-container-project');

    for (var i = 0; i < project.length; i++) {
        project[i].addEventListener('mouseenter', pixelate);
        project[i].addEventListener('mouseenter', showDescription);
        project[i].addEventListener('mouseleave', depixelate);
        project[i].addEventListener('mouseleave', hideDescription);
    }

    function pixelate() {

        // Get image child of project
        var figure = this.querySelector('.projects-container-project-figure');
        var image = this.querySelector('.projects-container-project-figure-image');

        // Get the dimensions of image
        var width = image.clientWidth;
        var height = image.clientHeight;

        // Create canvas element
        var canvas = document.createElement('canvas');
        canvas.className = 'projects-container-project-description-canvas';
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
        context.ImageSmoothingEnabled = false;

        // Set the percentage of pixelation
        var percent = 0.08;

        // Calculate the scaled dimension
        var scaledWidth = width * percent;
        var scaledHeight = height * percent;

        // Render image smaller.
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        // Stretch the smaller image onto larger context.
        context.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height);

        // Append canvas to project as a first-child
        figure.insertBefore(canvas, image);

    }

    function depixelate() {
        var figure = this.querySelector('.projects-container-project-figure');

        figure.removeChild(this.querySelector('canvas'));
    }

    function showDescription() {
        $(this).find('.projects-container-project-heading').addClass('is_hover');
        $(this).find('.projects-container-project-description').addClass('is_hover');
        $(this).find('.projects-container-project-description-canvas').addClass('is_hover');
    }

    function hideDescription() {
        $(this).find('.projects-container-project-heading').removeClass('is_hover');
        $(this).find('.projects-container-project-description').removeClass('is_hover');
    }

})();
