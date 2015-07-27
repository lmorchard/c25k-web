var View = require('ampersand-view');

module.exports = View.extend({

  template: `
    <section class="helpView">

      <h2>Welcome to Couch-to-5k ®</h2>
      <p>
        This is <a href="https://github.com/lmorchard/c25k-web">a free and
        Open Source web app</a> built by me (<a href="http://lmorchard.com">@lmorchard</a>)
        to help complete the Couch-to-5k ® running program.
      </p>
      <p>
        To start, tap the "&lt" button in
        the top corner. Then, tap any of the workouts in the list to pick
        what you want to do.
      </p>

      <h3>About Couch-to-5k ®</h3>
      <p>
        Couch-to-5k ® is a training program for beginning runners,
        <a href="http://www.coolrunning.com/engine/2/2_3/181.shtml" target="_blank">designed
        by the folks at CoolRunning.com</a>.
      </p>
      <p>
        The goal is to take you from the couch, to running for short periods with
        breaks for walking, to running a full 5 kilometers - or 3.1 miles.
      </p>
      <p>
        Over the course of 3 days per week for 9 weeks, your time
        spent running gradually increases and walking gradually decreases.
        By the end, you're running the whole time.
      </p>

      <h3>My advice so far</h2>
      <p>
        Go at your own pace, repeat any day or week you like until
        you feel you're ready to progress. It's better to commit to
        continuing the program, rather than quit because it gets too hard.
      </p>
      <p>
        I've also found that it's
        useful to repeat the whole program if, for example, you stopped
        running for winter. (Doh.)
      </p>

    </section>
  `,

  render: function (opts) {
    this.viewClass = 'help';
    this.renderWithTemplate(this);
    return this;
  }

});
