var Collection = require('ampersand-collection');

module.exports = Collection.extend({
  model: require('./Workout'),
  mainIndex: 'cid'
});
