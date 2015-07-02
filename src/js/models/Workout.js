var State = require('ampersand-state');

module.exports = State.extend({

  props: {
    title: 'string',
    events: 'array',
    duration: 'number',
    elapsed: 'number'
  },

  initialize: function () {
    // Pre-calculate the start/end elapsed times & total duration.
    var duration = 0;
    this.events.forEach(function (event) {
      event.startElapsed = duration;
      duration += event.duration * 1000;
      event.endElapsed = duration;
    });

    this.duration = duration;
  },

  derived: {

    currentEventIdx: {
      deps: ['elapsed'],
      cached: true,
      fn: function () {
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

  }

});
