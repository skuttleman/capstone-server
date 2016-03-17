var mongo = require('./mongo');
var data = require('../api/v1/games-test.js').data;

mongo.runQuery('game_levels', 'update', {}, { $set: data }).then(console.log);
