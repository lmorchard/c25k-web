var View = require('ampersand-view')
var Utils = require('../utils');

module.exports = View.extend({

  autoRender: true,

  props: {
    type: 'string',
    title: 'string',
    time: 'number'
  },

  derived: {
    minutes: {
      deps: ['time'],
      fn: function () {
        return Utils.zeroPad(this.time / 60000, 2);
      }
    },
    seconds: {
      deps: ['time'],
      fn: function () {
        return Utils.zeroPad((this.time - (this.minutes * 60000)) / 1000, 2);
      }
    },
    decimal: {
      deps: ['time'],
      fn: function () {
        return Utils.zeroPad(this.time - (this.minutes * 60000) - (this.seconds * 1000), 3);
      }
    }
  },

  template: [
    '<span class="timer">',
    '<span class="title" data-hook="title"></span>',
    ' <span class="minutes" data-hook="minutes">00</span>',
    ':<span class="seconds" data-hook="seconds">00</span>',
    // '.<span class="decimal" data-hook="decimal">000</span>',
    '</span>'
  ].join(''),

  bindings: {
    title: '[data-hook=title]',
    time: '[data-hook=time]',
    minutes: '[data-hook=minutes]',
    seconds: '[data-hook=seconds]',
    decimal: '[data-hook=decimal]'
  },

  render: function () {
    this.renderWithTemplate(this);
    this.el.classList.add(this.type);
    return this;
  }

});
