var Promise = require('es6-promise').Promise;
var State = require('ampersand-state');
var Collection = require('ampersand-collection');
var WorkoutCollection = require('./WorkoutCollection');
var throttle = require('lodash.throttle');

var SAVE_THROTTLE_DELAY = 1000;
var LS_KEY_PREFIX = 'c25k-workout-';

module.exports = State.extend({

  props: {
    title: 'string',
    workouts: 'object'
  },

  initialize: function () {

    this.workouts = new WorkoutCollection();

    this.loadWorkoutDefinitions().then((data) => {

      this.title = data.title;
      this.workouts.set(data.workouts);

      return this.loadWorkoutsProgress();

    }).then((progressData) => {

      // If we have any progress data, update the workouts.
      if (progressData.length) {
        progressData.forEach((item) => {
          if (!item.elapsed) { return; }
          var workout = this.workouts.get(item.id);
          if (!workout) { return; }
          workout.elapsed = item.elapsed;
        });
      }

      // Set up a listener to periodically save progress as it changes
      this.listenTo(this.workouts, 'change', throttle((ev) => {
        this.saveWorkoutsProgress().then(() => {
          console.log('Saved workout progress');
        });
      }, SAVE_THROTTLE_DELAY));

    }).catch((err) => {
      // TODO: Will need an actual error handler.
      console.error(err);
    });

  },

  loadWorkoutDefinitions: function () {
    // TODO: use fetch(), and localize?
    return new Promise((resolve, reject) => {
      return resolve(require('../../data/c25k.json'));
    });
  },

  loadWorkoutsProgress: function () {
    // TODO: Use a pluggable server?
    return Promise.all(this.workouts.map((workout) => {
      return new Promise((resolve, reject) => {
        var dataTxt = window.localStorage.getItem(LS_KEY_PREFIX + workout.id);
        resolve(dataTxt ? JSON.parse(dataTxt) : {});
      });
    }));
  },

  saveWorkoutsProgress: function () {
    // TODO: Use a pluggable server?
    return Promise.all(this.workouts.map((workout) => {
      return new Promise((resolve, reject) => {
        var data = {
          id: workout.id,
          elapsed: workout.elapsed
        };
        window.localStorage.setItem(LS_KEY_PREFIX + workout.id, JSON.stringify(data));
        resolve(true);
      });
    }));
  }

});
