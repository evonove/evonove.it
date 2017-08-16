// Import smartphone JSON model
import smartphone from '../3d-models/smartphone.json';
import laptop from '../3d-models/laptop.json';
import pencil from '../3d-models/pencil.json';
import lightBulb from '../3d-models/bulb.json';

const appsService = document.querySelector('.services-list-item:nth-of-type(1) h3');
const webService = document.querySelector('.services-list-item:nth-of-type(2) h3');
const designService = document.querySelector('.services-list-item:nth-of-type(3) h3');
const marketingService = document.querySelector('.services-list-item:nth-of-type(4) h3');

// Global variables
let renderer;
let scene;
let camera;

let clearRender;

const servicesCanvas = document.querySelector('.services-3dmodels');

/**
 * Load the JSON 3D model and set a geometry.
 * @param  {JSON} threeModel [JSON 3D model]
 */
function loadModel(threeModel) {
  const loader = new THREE.JSONLoader();
  const model = loader.parse(threeModel);
  const mesh = new THREE.Mesh(model.geometry, new THREE.MeshNormalMaterial({ wireframe: true }));
  scene.add(mesh);
}

/**
 * Render the scene and delegate to requestAnimationFrame for future renders.
 */
function render() {
  // Handle camera rotation
  const rotSpeed = 0.005;
  const x = camera.position.x;
  const z = camera.position.z;
  camera.position.x = (x * Math.cos(rotSpeed)) + (z * Math.sin(rotSpeed));
  camera.position.z = (z * Math.cos(rotSpeed)) - (x * Math.sin(rotSpeed));
  camera.lookAt(scene.position);

  renderer.render(scene, camera);

  clearRender = requestAnimationFrame(render);
}

/**
 * Render the scene of 3D model.
 * The scene is reloaded from the beginning every time a mouseover event is
 * triggered on a service.
 * @param  {JSON} threeModel [JSON 3D model]
 * @param  {number} fov [the field of view, needed for setting the zoom value]
 * @param  {number} camX [the position of the camera on the x axis]
 * @param  {number} camY [the position of the camera on the y axis]
 * @param  {number} camZ [the position of the camera on the z axis]
 */
function renderModel(threeModel, fov, camX, camY, camZ) {
  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Create a render, set the background color and size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x242528, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Position and point the camera
  camera.position.x = camX;
  camera.position.y = camY;
  camera.position.z = camZ;
  camera.lookAt(scene.position);

  loadModel(threeModel);

  // If canvas exists run the code within.
  // This code is needed to reload the scene from the beginning every time
  // a mouseover event is triggered on each service.
  if (servicesCanvas.hasChildNodes()) {
    // Cancel the requestAnimationFrame so that scene restart from its default state
    cancelAnimationFrame(clearRender);

    // Lose context if active
    const canvas = document.querySelector('.services-3dmodels > canvas');
    const gl = canvas.getContext('webgl');
    gl.getExtension('WEBGL_lose_context').loseContext();

    // Remove canvas if exists
    servicesCanvas.removeChild(servicesCanvas.firstChild);
  }

  // Add the output of the renderer to the html element
  servicesCanvas.appendChild(renderer.domElement);

  // Calls the handleResize function when the window is resized.
  window.addEventListener('resize', handleResize);

  // Call the render function, after the first render, interval is determinated
  // by requestAnimationFrame
  render();
}

/**
 * Function handles the resize event. This make sure the camera and the
 * renderer are updated at the correct moment.
 */
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Render the smartphone 3D model.
 */
function showAppsServiceModel() {
  renderModel(smartphone, 7, 50, 40, 50);
}

/**
 * Render the laptop 3D model.
 */
function showWebServiceModel() {
  renderModel(laptop, 1.1, 50, 40, 50);
}

/**
 * Render the pencil 3D model.
 */
function showDesignServiceModel() {
  renderModel(pencil, 12, 10, 50, 50);
}

/**
 * Render the light bulb 3D model.
 */
function showMarketingServiceModel() {
  renderModel(lightBulb, 60, 50, 40, 50);
}

// If canvas' parent exists, load each service model when mouseover event is
// trigged on the related element.
if (servicesCanvas) {
  appsService.addEventListener('mouseover', showAppsServiceModel);
  webService.addEventListener('mouseover', showWebServiceModel);
  designService.addEventListener('mouseover', showDesignServiceModel);
  marketingService.addEventListener('mouseover', showMarketingServiceModel);
}
