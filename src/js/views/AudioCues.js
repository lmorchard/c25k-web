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

    console.log('CUE', this.workout.currentEvent);

    if (!this.el) {
      this.el = document.createElement('audio');
      this.el.mozAudioChannelType = 'notification';
      this.el.setAttribute('preload', 'auto');
      this.el.style.display = 'none';

      this.source = document.createElement('source');
      this.source.setAttribute('src', '');
      this.source.setAttribute('type', '');
      this.el.appendChild(this.source);
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
        console.log("TRYING TO PLAY", clip);
        //this.source.src = clip;
        //this.source.type = 'audio/mp3';
        this.el.src = clip;
        this.el.play();

        function notify () {
          var notification = new Notification(
            'start '+ currentEvent.type,
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
        
        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            notify();
          } else {
            Notification.requestPermission(notify);
          }
        }

        /*
        if (window.navigator.vibrate) {
          window.navigator.vibrate([100, 50, 100, 50, 100]);
        }
        */
      }
    }

  }

});
