var app = require('ampersand-app');
var View = require('ampersand-view')
var WorkoutBar = require('./WorkoutBar');
var WorkoutView = require('./Workout');

module.exports = View.extend({

  template: `
    <li class="workout">
      <span class="title" data-hook="title"></span>
      <div class="workoutBar"><canvas></canvas></div>
    </li>
  `,

  bindings: {
    'model.title': '[data-hook=title]'
  },

  events: {
    'click li': 'selectWorkout'
  },

  selectWorkout: function () {
    // TODO: Come up with a better index than cid?
    app.router.navigate('workouts/' + this.model.id);
  },

  subviews: {
    bar: {
      container: '.workoutBar canvas',
      constructor: WorkoutBar
    }
  }

});
