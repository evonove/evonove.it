(function () {
  // Global variables
  let renderer;
  let scene;
  let camera;

  let controls;

  const fov = 35;

  const start = Date.now();

  const splashCanvas = document.querySelector('.splash-3dmodels');

  /**
   * Function handles the resize event. This make sure the camera and the
   * renderer are updated at the correct moment.
   */
  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  /**
   * Render the scene and delegate to requestAnimationFrame for future renders.
   */
  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  /**
   * Render the scene of 3D model.
   */
  function renderSplashModel() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera and place it 100 units away, looking towards the center of the scene.
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;

    // Create a shader material
    const material = new THREE.ShaderMaterial({
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
      wireframe: true,
    });

    // Create a sphere and assign the material
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 4), material);
    scene.add(mesh);

    // Create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x242528, 1.0);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add the output of the renderer to the html element
    splashCanvas.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    onWindowResize();
    window.addEventListener('resize', onWindowResize);

    render();
  }

  window.addEventListener('load', renderSplashModel);
})();
