var app = require('ampersand-app');
var Router = require('ampersand-router');
var WorkoutList = require('./views/WorkoutList');
var WorkoutView = require('./views/Workout');

module.exports = Router.extend({
  
  routes: {
    "": "home",
    "workouts/:index": "workout",
    "(*path)": "catchAll"
  },

  home: function () {
    app.trigger('page', new WorkoutList({
      collection: app.model.workouts
    }));
  },

  workout: function (index) {
    app.trigger('page', new WorkoutView({
      model: app.model.workouts.get(index)
    }));
  },

  catchAll: function (path) {
    this.redirectTo('');
  }

});
