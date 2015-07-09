var app = require('ampersand-app');
var AppModel = require('./js/models/App');
var AppView = require('./js/views/App');

app.extend({

  initialize: function () {
    this.model = new AppModel();
    this.view = new AppView({ model: this.model });

    this.view.render();
    document.body.appendChild(this.view.el);
  }

});

app.initialize();
