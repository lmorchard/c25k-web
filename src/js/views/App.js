var app = require('ampersand-app');
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');

module.exports = View.extend({

  template: [
    '<section class="app stopped">',
    '  <h1 class="title">',
    '    <button class="back">&lt;</button>',
    '    <span data-hook="title">c25k web</span>',
    '  </h1>',
    '  <section class="main" data-hook="main"></section>',
    '</section>'
  ].join(''),

  bindings: {
    'model.title': '[data-hook=title]'
  },

  events: {
    'click button.back': 'back',
  },

  initialize: function () {
    this.listenTo(app, 'page', this.handleNewPage);
  },

  back: function () {
    app.router.navigate('');
  },

  handleNewPage: function (view) {
    this.switcher.set(view);
  },

  render: function () {
    var self = this;

    this.renderWithTemplate(this);

    this.switcher = new ViewSwitcher(this.queryByHook('main'), {
      hide: function (oldView, cb) {
        self.el.classList.remove(oldView.viewClass);
        return cb();
      },
      show: function (newView) {
        self.el.classList.add(newView.viewClass);
      }
    });

    return this;
  }

});
