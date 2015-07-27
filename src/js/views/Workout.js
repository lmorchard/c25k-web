var View = require('ampersand-view');

var AudioCues = require('./AudioCues');
var WorkoutBar = require('./WorkoutBar');
var ClockBar = require('./ClockBar');

module.exports = View.extend({

  template: `
    <section class="workoutView stopped">
      <h2 data-hook="title"></h2>
      <section class="bar"><canvas data-hook="bar"></canvas></section>
      <section data-hook="timers" class="timers"></section>
      <audio data-hook="cues" mozaudiochannel="notification" preload="auto"></audio>
      <footer class="timer-controls">
        <button class="previous">&#x21e4;</button>
        <button class="playpause"><span>&#9658;</span></button>
        <button class="next">&#x21e5;</button>
      </footer>
    </section>
  `,

  autoRender: true,

  bindings: {
    'model.title': '[data-hook=title]'
  },

  subviews: {
    bar: {
      container: '[data-hook=bar]',
      constructor: WorkoutBar
    },
    timers: {
      container: '[data-hook=timers]',
      constructor: ClockBar
    },
    cues: {
      container: '[data-hook=cues]',
      constructor: AudioCues
    }
  },

  events: {
    'click footer button.previous': 'previousEvent',
    'click footer button.next': 'nextEvent',
    'click footer button.playpause': 'playPause'
  },

  previousEvent: function () {
    var event = this.model.previousEvent;
    if (event) { this.model.elapsed = event.startElapsed; }
  },

  nextEvent: function () {
    var event = this.model.nextEvent;
    if (event) { this.model.elapsed = event.startElapsed; }
  },

  playPause: function () {
    this.model.toggle();
  },

  initialize: function (opts) {

    this.viewClass = 'workout';

    this.listenTo(this.model, 'change:running', function () {
      if (!this.el) { return; }
      var cl = this.el.classList;
      cl.remove(this.model.running ? 'stopped' : 'running');
      cl.add(this.model.running ? 'running' : 'stopped');
    });

    return this;
  },

  remove: function () {
    // Stop the timer ticking when this view is removed.
    this.model.stop();
    View.prototype.remove.call(this);
  }

});
