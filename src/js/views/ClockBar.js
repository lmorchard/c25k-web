var View = require('ampersand-view')
var Clock = require('./Clock');

module.exports = View.extend({

  initialize: function (options) {
    if (this.parent) { this.model = this.parent.model; }
  },

  template: [
    '<section class="timers">',
    '<div class="timer elapsed" data-hook="elapsed"></div>',
    '<div class="timer current" data-hook="current"></div>',
    '<div class="timer remaining" data-hook="remaining"></div>',
    '</section>'
  ].join(''),

  subviews: {
    elapsed: {
      hook: 'elapsed',
      constructor: function (options) {
        return new Clock({
          type: 'elapsed', title: 'Elapsed',
          countdown: false, time: 0,
          el: options.el, parent: options.parent,
          updateTime: function () {
            var model = this.parent.model;
            this.time = model.elapsed;
          }
        });
      }
    },
    current: {
      hook: 'current',
      constructor: function (options) {
        return new Clock({
          type: 'current', title: '--',
          countdown: true, time: 0,
          el: options.el, parent: options.parent,
          updateTime: function () {
            var model = this.parent.model;
            var event = model.currentEvent;
            if (!event) { return; }
            this.title = event.type;
            this.time = (event.duration * 1000) -
                        (model.elapsed - event.startElapsed);
          }
        });
      }
    },
    remaining: {
      hook: 'remaining',
      constructor: function (options) {
        return new Clock({
          type: 'remaining', title: 'Remaining',
          countdown: false, time: 0,
          el: options.el, parent: options.parent,
          updateTime: function () {
            var model = this.parent.model;
            this.time = model.duration - model.elapsed;
          }
        });
      }
    }
  }

});
