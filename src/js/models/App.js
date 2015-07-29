var State = require('ampersand-state');
var WorkoutCollection = require('./WorkoutCollection');

module.exports = State.extend({

  props: {
    title: 'string',
    workouts: 'object'
  },

  initialize: function () {
    this.workouts = new WorkoutCollection();
  }

});
