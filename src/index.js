var app = require('ampersand-app');
var AppModel = require('./js/models/App');
var AppView = require('./js/views/App');
var AppRouter = require('./js/router');
var domready = require('domready');

app.extend({

  initialize: function () {
    this.model = new AppModel();
    this.view = new AppView({ model: this.model });
    this.router = new AppRouter();

    this.view.render();
    document.body.appendChild(this.view.el);

    this.router.history.start({
      pushState: false,
      hashChange: true
    });
  }

});

// HACK: Give access to the app from console
window.app = app;

domready(app.initialize.bind(app));
