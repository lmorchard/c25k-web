var View = require('ampersand-view');
var Utils = require('../utils');

var WorkoutBar = module.exports = View.extend({

  initialize: function (options) {
    View.prototype.initialize.apply(this, arguments);
    this.model.on('change:elapsed', this.render.bind(this));
    this.render();
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

    var widthByDuration = this.el.width / this.model.duration;

    var colors = {
      'warmup': '#2F4F4F',
      'walk': '#006400',
      'run': '#228B22',
      'cooldown': '#2F4F4F'
    };

    var height = this.el.height;

    function drawEventBar (event, barHeight) {
      var startX = event.startElapsed * widthByDuration;
      var width = event.endElapsed * widthByDuration - startX;
      var startY = (height - barHeight) / 2;
      ctx.fillRect(startX, startY, width, barHeight);
    }

    var currentEvent = this.model.currentEvent;
    if (currentEvent) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      drawEventBar(currentEvent, height);
    }

    this.model.events.forEach(function (event) {
      ctx.fillStyle = colors[event.type];
      drawEventBar(event, height * 0.66);
    });

    var elapsedPos = this.model.elapsed * widthByDuration;
    ctx.fillStyle = "#fff";
    ctx.fillRect(elapsedPos, 0, 1, height);

  }

});
