var $ = require('./js/bling');
var Utils = require('./js/utils');

var DATA = require('./data/c25k.json');

var Collection = require('ampersand-collection');
var lodashMixin = require('ampersand-collection-lodash-mixin');

var WorkoutCollection = Collection.extend(lodashMixin, {
  model: require('./js/models/Workout'),
  mainIndex: 'title'
});

var workoutCollection = new WorkoutCollection(DATA.workouts);

if (true) {

var WorkoutList = require('./js/views/WorkoutList');
var workoutList = new WorkoutList({ collection: workoutCollection });
$$('.app .workoutList').appendChild(workoutList.el);

}

if (true) {

var workout = workoutCollection.at(13);

var Timer = require('./js/models/Timer');
var timer = new Timer();

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

}
