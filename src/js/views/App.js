var app = require('ampersand-app');
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');

module.exports = View.extend({

  template: `
    <section class="app home">
      <h1 class="title">
        <button class="back">&lt;</button>
        <span data-hook="title">c25k web</span>
        <button class="help">?</button>
      </h1>
      <section class="main" data-hook="main"></section>
    </section>
  `,

  bindings: {
    'model.title': '[data-hook=title]'
  },

  events: {
    'click button.back': 'back',
    'click button.help': 'help'
  },

  initialize: function () {
    this.listenTo(app, 'page', this.handleNewPage);
  },

  back: function () {
    app.router.navigate('');
  },

  help: function () {
    app.router.navigate('help');
  },

  handleNewPage: function (view) {
    window.scrollTo(0, 0);
    this.switcher.set(view);
  },

  render: function () {
    var self = this;

    this.renderWithTemplate(this);

    this.switcher = new ViewSwitcher(this.queryByHook('main'), {
      hide: function (oldView, cb) {
        return cb();
      },
      show: function (newView) {
        self.el.className = 'app ' + newView.viewClass;
      }
    });

    return this;
  }

});
