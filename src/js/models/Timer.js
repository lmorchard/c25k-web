var State = require('ampersand-state');

// TODO: Make configurable? Is that even necessary?
var TIMER_INTERVAL = 100;

module.exports = State.extend({
  props: {
    running: 'boolean',
    elapsed: 'number',
    last: 'number'
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

    setTimeout(this.run.bind(this), TIMER_INTERVAL);
  }
});
