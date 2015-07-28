var State = require('ampersand-state');

// TODO: Make configurable? Is that even necessary?
var TIMER_INTERVAL = 100;

module.exports = State.extend({

  props: {
    id: 'string',
    title: 'string',
    events: 'array',
    duration: 'number',
    running: 'boolean',
    elapsed: 'number',
    last: 'number'
  },

  derived: {

    // Reducing down from ms cuts CPU by limiting update FPS
    elapsedSkip: {
      deps: ['elapsed'],
      fn: function () {
        return parseInt(this.elapsed / 500);
      }
    },

    currentEventIdx: {
      deps: ['elapsedSkip'],
      cached: true,
      fn: function () {
        if (this.elapsed === 0) {
          return 0;
        }
        if (this.elapsed >= this.duration) {
          return this.events.length - 1;
        }
        for (var i=0; i<this.events.length; i++) {
          var event = this.events[i];
          if (this.elapsed >= event.startElapsed &&
              this.elapsed < event.endElapsed) {
            return i;
          }
        }
      }
    },

    currentEvent: {
      deps: ['currentEventIdx'],
      fn: function () {
        return this.events[this.currentEventIdx];
      }
    },

    nextEvent: {
      deps: ['currentEventIdx'],
      fn: function () {
        return this.events[this.currentEventIdx + 1];
      }
    },

    previousEvent: {
      deps: ['currentEventIdx'],
      fn: function () {
        return this.events[this.currentEventIdx - 1];
      }
    }

  },

  initialize: function () {

    // Wrap every workout in start & end marker events.
    this.events.unshift({ type: 'start', duration: 0.01});
    this.events.push({ type: 'end', duration: 0.01 });

    // Pre-calculate the start/end elapsed times & total duration.
    var duration = 0;
    this.events.forEach(function (event) {
      event.startElapsed = duration;
      duration += event.duration * 1000;
      event.endElapsed = duration - 1;
    });

    // Record the total duration, initialize elapsed to 0
    this.duration = duration;
    this.elapsed = 0;
  },

  reset: function () {
    this.set({
      running: false,
      last: 0,
      elapsed: 0
    })
  },

  start: function () {
    this.set({
      last: Date.now(),
      running: true
    });
    return this.run();
  },

  stop: function () {
    this.running = false;
    return this;
  },

  toggle: function () {
    return this.running ? this.stop() : this.start();
  },

  run: function () {
    if (!this.running) { return; }

    var timeNow = Date.now();

    if (this.last > 0) {
      var step = timeNow - this.last;
      this.elapsed = this.elapsed + step;
    }

    this.last = timeNow;

    if (this.elapsed >= this.duration) {
      // Handle the end of the workout
      this.elapsed = this.duration;
      this.running = false;
    } else {
      setTimeout(this.run.bind(this), TIMER_INTERVAL);
    }

    return this;
  }

});
