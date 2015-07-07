var $ = require('./js/bling');
var Utils = require('./js/utils');

var Timer = require('./js/models/Timer');
var timer = new Timer();

var DATA = require('./data/c25k.json');
var Workout = require('./js/models/Workout');
var workout = new Workout(DATA.workouts[12]);

$$('.app .main .workoutTitle').innerHTML = workout.title;

var AudioCues = require('./js/views/AudioCues');
var audioCues = new AudioCues({ model: workout });
$$('.app .main').appendChild(audioCues.el);

var WorkoutBar = require('./js/views/WorkoutBar');
var workoutBar = new WorkoutBar({ model: workout });
$$('.app .main .workout').appendChild(workoutBar.el);
workoutBar.render();

var ClockBar = require('./js/views/ClockBar');
var clockBar = new ClockBar({ model: workout });
$$('.app .main').appendChild(clockBar.el);

timer.on('change:elapsed', function () {
  if (timer.running) {
    workout.elapsed = timer.elapsed;
  }
});

timer.on('change:running', function () {
  var appRoot = $$('body .app');
  appRoot.classList.remove(timer.running ? 'stopped' : 'running');
  appRoot.classList.add(timer.running ? 'running' : 'stopped');
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
