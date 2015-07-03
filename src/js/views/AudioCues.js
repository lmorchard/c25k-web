var View = require('ampersand-view');

module.exports = View.extend({

  props: {
    workout: 'object'
  },

  initialize: function (options) {
    View.prototype.initialize.apply(this, arguments);
    this.workout.on('change:currentEvent', this.render.bind(this));
  },

  render: function () {

    if (!this.el) {
      this.el = document.createElement('audio');
      this.el.setAttribute('preload', 'auto');
      this.el.style.display = 'none';
    }

    var parentNode = this.el.parentNode;
    if (!parentNode) { return; }

    var clips = {
      warmup: 'audio/en-US/warmup.mp3',
      run: 'audio/en-US/run.mp3',
      walk: 'audio/en-US/walk.mp3',
      cooldown: 'audio/en-US/cooldown.mp3'
    };

    var currentEvent = this.workout.currentEvent;
    if (currentEvent) {
      var clip = clips[currentEvent.type];
      if (clip) {
        this.el.src = clip;
        this.el.play();
      }
    }

  }

});
