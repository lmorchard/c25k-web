var View = require('ampersand-view');

module.exports = View.extend({

  template: `
    <section class="startupView">
      <h2>Loading to Couch-to-5k ®...</h2>
    </section>
  `,

  render: function (opts) {
    this.viewClass = 'startup';
    this.renderWithTemplate(this);
    return this;
  }

});
