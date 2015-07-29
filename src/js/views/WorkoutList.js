var View = require('ampersand-view');
var WorkoutListItem = require('./WorkoutListItem');

module.exports = View.extend({

  template: `
    <section class="workoutList">
      <ul class="workouts"></ul>
    </section>
  `,

  render: function (opts) {

    this.viewClass = 'home';

    this.renderWithTemplate(this);

    this.renderCollection(this.collection, WorkoutListItem,
        this.el.querySelector('.workouts'), opts);

    // TODO: Find a decent event to tie this to, rather than just a delay.
    setTimeout(() => {
      this.scrollToFirstUncompletedWorkout();
    }, 50);

    return this;

  },

  scrollToFirstUncompletedWorkout: function () {

    var el;

    for (var idx = 0; idx < this.collection.length; idx++) {
      var workout = this.collection.at(idx);
      if (!workout.currentEvent || workout.currentEvent.type !== 'end') {
        el = document.querySelector('li#' + workout.id);
        break;
      }
    }

    if (el) {
      // TODO: Find calculation to roughly center the element
      var elRect = el.getBoundingClientRect();
      window.scrollTo(0, elRect.top - 150);
    }

  }

});
