require('gulp');

// importing Wheelie instance and a list of tasks (recipe)
var Wheelie = require('wheelie');
var recipe = require('wheelie-recipe');

// adding a recipe to Wheelie, defining the default task
var wheelie = new Wheelie();
wheelie.add(recipe);

// Update the vendor path so that Uglify points to the correct folder
wheelie.update('uglify', { vendorsPath: '' });

// disable browser-sync
wheelie.disable('browser-sync');

// build customizations
var vendors = [
    'node_modules/particles.js/particles.js',
    'node_modules/three/build/three.js',
    'node_modules/three/examples/js/SimplexNoise.js',
    'node_modules/smoothscroll/smoothscroll.js'
];

var scripts = [
    'mouse-pixels.js',
    'people.js',
    'projects-pixelation.js',
    'scroll-down.js',
    'blog-tags.js',
    'texture3d.js',
    'viewport.js',
    'threex.terrain.js'
];

wheelie.update('uglify', {
  scripts: scripts,
  vendors: vendors
});

wheelie.build();
