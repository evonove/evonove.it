require('gulp');

// importing Wheelie instance and a list of tasks (recipe)
var wheelie = require('wheelie');
var recipe = require('wheelie-recipe');

// adding a recipe to Wheelie, defining the default task
wheelie.add(recipe);
wheelie.setDefault('watch');

// build customizations
var vendors = [
    'jquery/dist/jquery.min.js',
    'particles.js/particles.min.js',
    'masonry/dist/masonry.pkgd.min.js',
    'svg-injector/dist/svg-injector.min.js'
];

var scripts = [
    'mouse-pixels.js',
    'people.js',
    'projects-grid.js',
    'projects-pixelation.js',
    'scroll-down.js',
    'works-slider.js',
    'svg-injections.js',
    'viewport.js'
];

wheelie.update('uglify', {
  scripts: scripts,
  vendors: vendors
});

wheelie.setBuild('static/');
wheelie.setDist('static/');
wheelie.build();
