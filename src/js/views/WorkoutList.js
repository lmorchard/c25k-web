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

    return this;

  }

});
