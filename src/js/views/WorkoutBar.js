var View = require('ampersand-view');
var Utils = require('../utils');
var throttle = require('lodash.throttle');

var WorkoutBar = module.exports = View.extend({

  initialize: function (options) {
    if (this.parent) { this.model = this.parent.model; }
    this.updateTimeOnClick = !!options.updateTimeOnClick;

    this.throttledDrawBar = throttle(this.drawBar.bind(this), 16);

    this.listenTo(this.model, 'change:elapsedSkip', this.throttledDrawBar);
    this.listenTo(this.model, 'change:currentEvent', this.throttledDrawBar);

    window.addEventListener('resize', this.throttledDrawBar, false);
    window.addEventListener('orientationchange', this.throttledDrawBar, false);
  },

  remove: function () {
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('orientationchange', this.resizeHandler);
    View.prototype.remove.call(this);
  },

  render: function () {
    if (!this.el) {
      this.el = document.createElement('canvas');
    }
    this.drawBar();
  },

  drawBar: function () {
    var self = this;

    var parentNode = this.el.parentNode;
    if (!parentNode) { return; }

    // HACK: Defer drawing until there's a parent node size available
    // This seems like a really terrible way to do it.
    if (!(parentNode.offsetWidth && parentNode.offsetHeight)) {
      setTimeout(this.drawBar.bind(this), 10);
      return this;
    }

    this.el.width = parentNode.offsetWidth;
    this.el.height = parentNode.offsetHeight;

    var ctx = this.el.getContext('2d');

    var widthByDuration = this.widthByDuration = this.el.width / this.model.duration;

    // TODO: Make this configurable
    var colors = {
      'warmup': '#2F4F4F',
      'walk': '#006400',
      'run': '#228B22',
      'cooldown': '#2F4F4F'
    };

    var height = this.el.height;

    var currentEvent = this.model.currentEvent;
    if (currentEvent) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      this.drawEventBar(ctx, widthByDuration, currentEvent, height);
    }

    this.model.events.forEach(function (event) {
      ctx.fillStyle = colors[event.type];
      self.drawEventBar(ctx, widthByDuration, event, height * 0.66);
    });

    var elapsedPos = this.model.elapsed * widthByDuration;
    ctx.fillStyle = "#fff";
    ctx.fillRect(elapsedPos, 0, 1, height);

  },

  drawEventBar: function (ctx, widthByDuration, event, barHeight) {
    var startX = event.startElapsed * widthByDuration;
    var width = event.endElapsed * widthByDuration - startX;
    var startY = (this.el.height - barHeight) / 2;
    ctx.fillRect(startX, startY, width, barHeight);
  },

  events: {
    'click': 'click',
    'mousedown': 'mousedown',
    'mouseup': 'mouseup',
    'mousemove': 'mousemove',
    'touchstart': 'touchstart',
    'touchend': 'touchend',
    'touchmove': 'touchmove'
  },

  updateTimeFromUI: function (x) {
    if (!this.updateTimeOnClick) { return; }
    if (!this.widthByDuration) { return; }
    var barRect = this.el.getBoundingClientRect();
    this.model.elapsed = (x - barRect.left) / this.widthByDuration;
  },

  click: function (ev) {
    return this.updateTimeFromUI(ev.clientX);
  },

  mousedown: function (ev) {
    this.isDragging = true;
  },

  mouseup: function (ev) {
    this.isDragging = false;
  },

  mousemove: function (ev) {
    if (this.isDragging) {
      return this.updateTimeFromUI(ev.clientX);
    }
  },

  touchstart: function (ev) {
    this.isTouching = true;
  },

  touchend: function (ev) {
    this.isTouching = false;
  },

  touchmove: function (ev) {
    if (this.isTouching) {
      return this.updateTimeFromUI(ev.touches[0].clientX);
    }
  }

});
