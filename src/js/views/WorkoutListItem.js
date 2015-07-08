var View = require('ampersand-view')
var WorkoutBar = require('./WorkoutBar');

module.exports = View.extend({

  template: [
    '<li class="workout">',
    '<span class="title" data-hook="title"></span>',
    '<span data-hook="pooppoop"><span data-hook="poop"></span></span>',
    '<div class="workoutBar"><canvas></canvas></div>',
    '</li>'
  ].join(''),

  bindings: {
    'model.title': '[data-hook=title]'
  },

  subviews: {
    bar: {
      container: '.workoutBar canvas',
      constructor: WorkoutBar
    }
  }

});
