(function() {

    // Request animation frame

    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

    // Pixelation

    var PIXELATION = 10;

    var items = document.querySelectorAll('.projects-container-project'),
        _objs = [];

    var Images = function(element, image, canvas, context) {
        this.element = element;
        this.image = image;
        this.canvas = canvas;
        this.context = context;
        this.pixelation = 1;
    }

    Images.prototype.bindLoad = function() {
        var obj = this;

        this.image.onload = function() {
            obj.reportLoad.call(obj);
        };

        if ( this.image.complete ) {
            this.image.onload();
        }
    }

    Images.prototype.reportLoad = function() {
        var obj = this;

        this.imageWidth    = this.canvas.width   = this.image.width;
        this.imageHeight   = this.canvas.height  = this.image.height;
        this.context.drawImage( this.image, 0, 0 );

        this.element.addEventListener('mouseover', function() {
            obj.mouseOver();
        }, false);

        this.element.addEventListener('mouseout', function() {
            obj.mouseOut();
        }, false);
    }

    Images.prototype.mouseOver = function() {
        var obj = this;
        cancelAnimationFrame( obj.idUndraw );
        var draw = function() {
            if ( obj.pixelation >= PIXELATION ) {
                cancelAnimationFrame( obj.idDraw );
                obj.pixelation = PIXELATION;
            } else {
                obj.context.drawImage( obj.image, 0, 0 );
                obj.pixelate( obj.imageWidth, obj.imageHeight, 0, 0 );
                obj.idDraw = requestAnimationFrame( draw, obj.context );
            }
        };
        obj.idDraw = requestAnimationFrame( draw, obj.context );
    }

    Images.prototype.mouseOut = function() {
        var obj = this;
        cancelAnimationFrame( obj.idDraw );
        var undraw = function() {
            if ( obj.pixelation < 1 ) {
                cancelAnimationFrame( obj.idUndraw );
                obj.pixelation = 1;
            } else {
                obj.context.drawImage( obj.image, 0, 0 );
                obj.depixelate( obj.imageWidth, obj.imageHeight, 0, 0 );
                obj.idUndraw = requestAnimationFrame( undraw, obj.context );
            }
        };
        obj.idUndraw = requestAnimationFrame( undraw, obj.context );
    }

    Images.prototype.setPixels = function() {
        var sw          = this.imageWidth,
            sh          = this.imageHeight,
            imageData   = this.context.getImageData( 0, 0, sw, sh ),
            data        = imageData.data,
            y, x, n, m;

        for ( y = 0; y < sh; y += this.pixelation ) {
            for ( x = 0; x < sw; x += this.pixelation ) {

                var red = data[((sw * y) + x) * 4];
                var green = data[((sw * y) + x) * 4 + 1];
                var blue = data[((sw * y) + x) * 4 + 2];

                for ( n = 0; n < this.pixelation; n++ ) {
                    for ( m = 0; m < this.pixelation; m++ ) {
                        if ( x + m < sw ) {
                            data[((sw * (y + n)) + (x + m)) * 4] = red;
                            data[((sw * (y + n)) + (x + m)) * 4 + 1] = green;
                            data[((sw * (y + n)) + (x + m)) * 4 + 2] = blue;
                        }
                    }
                }
            }
        }

        this.context.putImageData( imageData, 0, 0 );
    }

    Images.prototype.pixelate = function() {
        this.setPixels();
        this.pixelation += 1;
    }

    Images.prototype.depixelate = function() {
        this.setPixels();
        this.pixelation -= 1;
    }

    Array.prototype.slice.call(items, 0).forEach(function(el, i) {
        var element = el;
        image   = el.querySelector('.projects-container-project-image'),
            canvas  = document.createElement('canvas'),
            context = canvas.getContext('2d');

        el.appendChild( canvas );

        _objs.push( new Images( element, image, canvas, context ) );
        _objs[i].bindLoad();
    });

})();
