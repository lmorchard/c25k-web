var $ = require('./js/bling');
var Utils = require('./js/utils');

var Timer = require('./js/models/Timer');
var timer = new Timer();

var DATA = require('./data/c25k.json');
var Workout = require('./js/models/Workout');
var workout = new Workout(DATA.workouts[0]);

timer.on('change:running', function () {
  var appRoot = $$('body .app');
  appRoot.classList.remove(timer.running ? 'stopped' : 'running');
  appRoot.classList.add(timer.running ? 'running' : 'stopped');
});

timer.on('change:elapsed', function () {
  // TODO: My math could be better, here
  var time = workout.duration - timer.elapsed;

  var minutes = parseInt(time / 60000);
  var seconds = parseInt((time - (minutes * 60000)) / 1000);
  var decimal = parseInt(time - (minutes * 60000) - (seconds * 1000));

  var root = $$('.app .main .timer');
  root.querySelector('.minutes').innerHTML = Utils.zeroPad(minutes, 2);
  root.querySelector('.seconds').innerHTML = Utils.zeroPad(seconds, 2);
  root.querySelector('.decimal').innerHTML = Utils.zeroPad(decimal, 3);
});

timer.on('change:elapsed', function () {
  workout.elapsed = timer.elapsed;
})

workout.on('change:currentEvent', function () {
  $$('.app .main .event').innerHTML = workout.currentEvent.type;
});

$('.app footer button.playpause').on('click', function (ev) {
  timer.toggle();
});

$('.app footer button.previous').on('click', function (ev) {
  var event = workout.previousEvent;
  if (event) { timer.elapsed = event.startElapsed; }
});

$('.app footer button.next').on('click', function (ev) {
  var event = workout.nextEvent;
  if (event) { timer.elapsed = event.startElapsed; }
});

timer.reset();
