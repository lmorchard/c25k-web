var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');

module.exports = View.extend({

  template: [
    '<section class="app stopped">',
    '  <h1 class="title">',
    '    <button class="back">&lt;</button>',
    '    <span data-hook="title">c25k web</span>',
    '  </h1>',
    '  <section class="main" data-hook="mainView"></section>',
    '</section>'
  ].join(''),

  bindings: {
    'model.title': '[data-hook=title]'
  },

  events: {
    'click button.back': 'back',
  },

  back: function () {
    this.switcher.set(this.workoutList);
  },

  render: function () {

    this.renderWithTemplate(this);

    this.mainContainer = this.queryByHook('mainView');

    this.switcher = new ViewSwitcher(this.mainContainer, {

      hide: function (oldView, cb) {
        return cb();
      },

      show: function (newView) {

      }

    });

    var WorkoutList = require('./WorkoutList');
    var workoutList = this.workoutList = new WorkoutList({
      collection: this.model.workouts
    });

    this.switcher.set(workoutList);

    if (false) {
      var WorkoutView = require('./Workout');
      var workoutView = new WorkoutView({
        model: this.model.workouts.at(11)
      });
    }

    return this;
  }

});
