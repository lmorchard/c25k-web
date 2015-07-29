var View = require('ampersand-view');

module.exports = View.extend({

  template: `
    <section class="startupView">
      <h2>Loading workouts...</h2>
    </section>
  `,

  render: function (opts) {
    this.viewClass = 'startup';
    this.renderWithTemplate(this);
    return this;
  }

});
