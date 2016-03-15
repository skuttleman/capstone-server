var route = require('express').Router();

module.exports = route;

route.use('/v1/players', require('./v1/players'));
route.use('/v1/games', require('./v1/games'));
