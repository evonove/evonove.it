(function () {
    'use strict';

    var texture = document.querySelector('.js-texture');

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
    geometry.morphTargets.push({ name: "targetFoo", vertices: vertices });
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
    window.onscroll = function() {
        if(running) {
            running = false;
        } else if(document.documentElement.scrollTop === 0) {
            running = true;
            render();
        }
    };

    render();

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
})();
