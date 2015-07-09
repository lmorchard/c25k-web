var View = require('ampersand-view');

var Timer = require('../models/Timer');
var AudioCues = require('./AudioCues');
var WorkoutBar = require('./WorkoutBar');
var ClockBar = require('./ClockBar');

module.exports = View.extend({

  autoRender: true,

  template: [
    '  <section class="workoutView">',
    '    <h2 data-hook="title"></h2>',
    '    <section class="bar"><canvas data-hook="bar"></canvas></section>',
    '    <section data-hook="timers" class="timers"></section>',
    '    <audio data-hook="cues" mozaudiochannel="notification" preload="auto"></audio>',
    '    <footer class="timer-controls">',
    '     <button class="previous">&lt;&lt;</button>',
    '     <button class="playpause">Play</button>',
    '     <button class="next">&gt;&gt;</button>',
    '    </footer>',
    '  </section>'
  ].join(''),

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
    if (event) { this.timer.elapsed = event.startElapsed; }
  },

  nextEvent: function () {
    var event = this.model.nextEvent;
    if (event) { this.timer.elapsed = event.startElapsed; }
  },

  playPause: function () {
    this.timer.toggle();
  },

  render: function (opts) {
    var self = this;

    this.renderWithTemplate(this);

    var el = this.el;

    var timer = this.timer = new Timer();

    timer.on('change:elapsed', function () {
      if (timer.running) {
        self.model.elapsed = timer.elapsed;
      }
    });

    timer.on('change:running', function () {
      el.classList.remove(timer.running ? 'stopped' : 'running');
      el.classList.add(timer.running ? 'running' : 'stopped');
    });

    timer.reset();

    return this;
  }

});
