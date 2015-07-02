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

var Clock = require('./js/views/Clock');

var clocks = {
  elapsed: new Clock({ type: 'elapsed', title: 'Elapsed', time: 0 }),
  current: new Clock({ type: 'current', title: '', time: 0 }),
  remaining: new Clock({ type: 'remaining', title: 'Remaining', time: 0 })
};

var timersRoot = $$('.app .main .timers');
Object.keys(clocks).forEach(function (name) {
  var clock = clocks[name];
  clock.render();
  timersRoot.appendChild(clock.el);
})

timer.on('change:elapsed', function () {
  // TODO: My math could be better, here
  var event = workout.currentEvent;
  if (!event) { return; }

  clocks.elapsed.time = timer.elapsed;
  clocks.remaining.time = workout.duration - timer.elapsed;
  clocks.current.set({
    title: event.type,
    time: (event.duration * 1000) - (timer.elapsed - event.startElapsed)
  });
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
