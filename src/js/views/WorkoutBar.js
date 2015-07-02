var View = require('ampersand-view')
var Utils = require('../utils');

var WorkoutBar = module.exports = View.extend({

  autoRender: true,

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
    this.el.height = 150; //parentNode.offsetHeight;

    var ctx = this.el.getContext('2d');

    var widthByDuration = this.el.width / this.workout.duration;

    var colors = {
      'warmup': '#f00',
      'run': '#0f0',
      'walk': '#00f',
      'cooldown': '#ff0'
    };

    //ctx.fillStyle = '#000';
    //ctx.fillRect(0, 0, this.el.width, this.el.height);

    var height = 100; //this.el.height;

    function drawEventBar (event, barHeight) {
      var startPos = event.startElapsed * widthByDuration;
      var width = event.endElapsed * widthByDuration - startPos;
      ctx.fillRect(startPos, 0, width, barHeight);
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
