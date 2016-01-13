require('gulp');

// importing Wheelie instance and a list of tasks (recipe)
var wheelie = require('wheelie');
var recipe = require('wheelie-recipe');

// adding a recipe to Wheelie, defining the default task
wheelie.add(recipe);
wheelie.setDefault('watch');

// build customizations
var vendors = [
    'svg-injector/dist/svg-injector.min.js'
];

var scripts = [
    'svg-injections.js'
];

wheelie.update('uglify', {
  scripts: scripts,
  vendors: vendors
});

wheelie.setBuild('static/');
wheelie.setDist('static/');
wheelie.build();
