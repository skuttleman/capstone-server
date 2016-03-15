var route = require('express').Router();

module.exports = route;

if (process.env.NODE_ENV !== 'production') {
  var mock1 = require('./games-test');
  route.use('/mock1', mock1);
}
