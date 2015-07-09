var State = require('ampersand-state');
var Collection = require('ampersand-collection');
var WorkoutCollection = require('./WorkoutCollection');

module.exports = State.extend({

  props: {
    title: 'string',
    workouts: 'object'
  },

  initialize: function () {
    var DATA = require('../../data/c25k.json');
    this.title = DATA.title;
    this.workouts = new WorkoutCollection(DATA.workouts);
  }

});
