var $ = require('./js/bling');
var State = require('ampersand-state');

var TIMER_INTERVAL = 100;

var AppState = State.extend({
  props: {
    timerRunning: 'boolean',
    timeElapsed: 'number',
    timeLast: 'number'
  }
});

var appState = new AppState();

function resetTimer () {
  appState.set({
    timerRunning: false,
    timeLast: 0,
    timeElapsed: 0
  })
}

function startTimer () {
  appState.set({
    timeLast: Date.now(),
    timerRunning: true
  });
  setTimeout(runTimer, TIMER_INTERVAL);
}

function stopTimer () {
  appState.timerRunning = false;
}

function runTimer () {
  if (!appState.timerRunning) { return; }

  var timeNow = Date.now();

  if (appState.timeLast > 0) {
    var step = timeNow - appState.timeLast;
    appState.timeElapsed = appState.timeElapsed + step;
  }

  appState.timeLast = timeNow;

  setTimeout(runTimer, TIMER_INTERVAL);
}

appState.on('change:timerRunning', function () {
  var appRoot = $$('body .app');
  if (appState.timerRunning) {
    appRoot.classList.remove('paused');
    appRoot.classList.add('playing');
  } else {
    appRoot.classList.remove('playing');
    appRoot.classList.add('paused');
  }
});

function zeroPad (value, length) {
  var padded = ('' + '000' + value);
  return padded.substr(padded.length - length);
}

appState.on('change:timeElapsed', function () {

  var elapsed = appState.timeElapsed;

  var minutes = parseInt(elapsed / 60000);
  var seconds = parseInt((elapsed - (minutes * 60000)) / 1000);
  var decimal = parseInt(elapsed - (minutes * 60000) - (seconds * 1000));

  var timer = $$('.app .main .timer');

  timer.querySelector('.minutes').innerHTML = zeroPad(minutes, 2);
  timer.querySelector('.seconds').innerHTML = zeroPad(seconds, 2);
  timer.querySelector('.decimal').innerHTML = zeroPad(decimal, 3);

});

$('.app footer button.playpause').on('click', function (ev) {
  return appState.timerRunning ? stopTimer() : startTimer();
});

resetTimer();
