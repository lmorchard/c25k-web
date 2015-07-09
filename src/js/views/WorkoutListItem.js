var app = require('ampersand-app');
var View = require('ampersand-view')
var WorkoutBar = require('./WorkoutBar');
var WorkoutView = require('./Workout');

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

  events: {
    'click li': 'selectWorkout'
  },

  selectWorkout: function () {
    var workoutView = new WorkoutView({ model: this.model });
    // TODO: Is using a global here really a good idea? Maybe use a router instead?
    app.view.switcher.set(workoutView);
  },

  subviews: {
    bar: {
      container: '.workoutBar canvas',
      constructor: WorkoutBar
    }
  }

});
