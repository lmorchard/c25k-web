var View = require('ampersand-view')
var Utils = require('../utils');

module.exports = View.extend({

  autoRender: true,

  props: {
    type: 'string',
    title: 'string',
    time: 'number',
    countdown: 'boolean'
  },

  derived: {
    // HACK: Only count up or down in whole seconds, round differently
    // depending on direction.
    roundedSeconds: {
      deps: ['time'],
      fn: function () {
        return this.countdown ?
          Math.ceil(this.time / 1000) :
          Math.floor(this.time / 1000);
      }
    },
    minutes: {
      deps: ['roundedSeconds'],
      fn: function () {
        return Utils.zeroPad(this.roundedSeconds / 60, 2);
      }
    },
    seconds: {
      deps: ['roundedSeconds'],
      fn: function () {
        return Utils.zeroPad(this.roundedSeconds - (this.minutes * 60), 2);
      }
    }
  },

  template: [
    '<div class="timer">',
    '<span class="title" data-hook="title"></span>',
    ' <span class="minutes" data-hook="minutes">00</span>',
    ':<span class="seconds" data-hook="seconds">00</span>',
    '</div>'
  ].join(''),

  bindings: {
    title: '[data-hook=title]',
    time: '[data-hook=time]',
    minutes: '[data-hook=minutes]',
    seconds: '[data-hook=seconds]'
  },

  initialize: function (options) {
    View.prototype.initialize.apply(this, arguments);
    this.parent.model.on('change:elapsed', options.updateTime.bind(this));
    this.render();
  },

  render: function () {
    this.renderWithTemplate(this);
    this.el.classList.add(this.type);
    return this;
  }

});
