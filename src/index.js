var app = require('ampersand-app');
var Promise = require('es6-promise').Promise;
var AppModel = require('./js/models/App');
var AppView = require('./js/views/App');
var StartupView = require('./js/views/Startup');
var AppRouter = require('./js/router');
var domready = require('domready');
var throttle = require('lodash.throttle');

var SAVE_THROTTLE_DELAY = 1000;
var LS_KEY_PREFIX = 'c25k-workout-';

app.extend({

  initialize: function () {

    this.model = new AppModel();
    this.view = new AppView({ model: this.model });
    this.router = new AppRouter();

    this.view.render();
    document.body.appendChild(this.view.el);
    app.trigger('page', new StartupView());

    // TODO: Is this the right place to do all of this work?
    this.loadWorkoutDefinitions().then((data) => {
      return this.loadAllWorkoutsProgress();
    }).then((data) => {

      // Set up a listener to periodically save progress as it changes
      this.listenTo(this.model.workouts, 'change', throttle((workout) => {
        this.saveWorkoutProgress(workout).then(() => {
          console.log("Saved progress for " + workout.id);
        });
      }, SAVE_THROTTLE_DELAY));

      // Finally, kick off the router!
      this.router.history.start({
        pushState: false,
        hashChange: true
      });

      this.checkForFirstRun();

    }).catch((err) => {
      // TODO: Will need an actual error handler.
      console.error(err);
    });

  },

  checkForFirstRun: function () {
    var fteKey = LS_KEY_PREFIX + 'fteSeen';
    var fteVal = window.localStorage.getItem(fteKey);
    if (!fteVal || fteVal !== '1') {
      window.localStorage.setItem(fteKey, '1');
      app.router.navigate('help');
    }
  },

  loadWorkoutDefinitions: function () {
    // TODO: use fetch(), and localize?
    return new Promise((resolve, reject) => {
      var data = require('./data/c25k.json');

      this.model.title = data.title;
      this.model.workouts.set(data.workouts);

      setTimeout(() => resolve(data), 0.1);
    });
  },

  loadAllWorkoutsProgress: function () {
    // TODO: Use a pluggable server?
    return Promise.all(this.model.workouts.map((workout) => {
      return this.loadWorkoutProgress(workout);
    }));
  },

  loadWorkoutProgress: function (workout) {
    return new Promise((resolve, reject) => {
      var key = LS_KEY_PREFIX + 'progress-' + workout.id;
      var dataTxt = window.localStorage.getItem(key);
      if (!dataTxt) { resolve({}); }
      try {
        var data = JSON.parse(dataTxt);
        workout.elapsed = data.elapsed;
        return resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },

  saveWorkoutProgress: function (workout) {
    return new Promise((resolve, reject) => {
      var key = LS_KEY_PREFIX + 'progress-' + workout.id;
      var data = {
        id: workout.id,
        elapsed: workout.elapsed
      };
      window.localStorage.setItem(key, JSON.stringify(data));
      resolve(true);
    });
  }

});

// HACK: Give access to the app from console
window.app = app;

domready(app.initialize.bind(app));
