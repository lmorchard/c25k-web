var View = require('ampersand-view');

module.exports = View.extend({

  props: {
    model: 'object'
  },

  initialize: function (options) {
    if (this.parent) { this.model = this.parent.model; }
    this.listenTo(this.model, 'change:currentEvent', this.render);
  },

  render: function () {

    if (!this.el) {
      this.el = document.createElement('audio');
      this.el.mozAudioChannelType = 'notification';
      this.el.setAttribute('preload', 'auto');
      this.el.style.display = 'none';
    }

    // TODO: Localization
    var clips = {
      warmup: 'audio/en-US/warmup.mp3',
      run: 'audio/en-US/run.mp3',
      walk: 'audio/en-US/walk.mp3',
      cooldown: 'audio/en-US/cooldown.mp3'
    };

    var parentNode = this.el.parentNode;
    if (!parentNode) { return; }

    var currentEvent = this.model.currentEvent;
    if (!currentEvent) { return; }

    var clip = clips[currentEvent.type];
    if (!clip) { return; }

    this.el.src = clip;
    this.el.play();

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        this._notify();
      } else {
        Notification.requestPermission(this._notify.bind(this));
      }
    }

  },

  _notify: function () {
    var currentEvent = this.model.currentEvent;
    var notification = new Notification(
      'c25k: start ' + currentEvent.type,
      {
        tag: 'c25k-web-event',
        vibrate: [100, 50, 100, 50, 100],
        mozbehavior: {
          noscreen: true,
          showOnlyOnce: true
        }
      }
    );
  }

});
