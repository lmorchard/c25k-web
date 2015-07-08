var View = require('ampersand-view');
var WorkoutListItem = require('./WorkoutListItem');

module.exports = View.extend({

  autoRender: true,

  template: [
    '<ul class="workouts"></ul>'
  ].join(''),

  render: function (opts) {
    this.renderWithTemplate(this);
    this.renderCollection(this.collection, WorkoutListItem,
        this.el.querySelector('.workouts'), opts);
    return this;
  }

});
