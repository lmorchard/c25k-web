var View = require('ampersand-view');
var Utils = require('../utils');

var WorkoutBar = module.exports = View.extend({

  props: {
    timer: 'object',
    workout: 'object'
  },

  initialize: function (options) {
    View.prototype.initialize.apply(this, arguments);
    this.timer.on('change', this.render.bind(this));
    this.workout.on('change', this.render.bind(this));
  },

  render: function () {

    if (!this.el) {
      this.el = document.createElement('canvas');
    }

    var parentNode = this.el.parentNode;
    if (!parentNode) { return; }

    this.el.width = parentNode.offsetWidth;
    this.el.height = parentNode.offsetHeight;

    var ctx = this.el.getContext('2d');

    var widthByDuration = this.el.width / this.workout.duration;

    var colors = {
      'warmup': '#2F4F4F',
      'run': '#006400',
      'walk': '#228B22',
      'cooldown': '#2F4F4F'
    };

    var height = this.el.height;

    function drawEventBar (event, barHeight) {
      var startX = event.startElapsed * widthByDuration;
      var width = event.endElapsed * widthByDuration - startX;
      var startY = (height - barHeight) / 2;
      ctx.fillRect(startX, startY, width, barHeight);
    }

    this.workout.events.forEach(function (event) {
      ctx.fillStyle = colors[event.type];
      drawEventBar(event, height * 0.75);
    });

    var currentEvent = this.workout.currentEvent;
    if (currentEvent) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      drawEventBar(currentEvent, height);
    }

    var elapsedPos = this.timer.elapsed * widthByDuration;
    ctx.fillStyle = "#fff";
    ctx.fillRect(elapsedPos, 0, 1, height);

  }

});
