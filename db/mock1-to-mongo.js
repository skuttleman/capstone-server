var mongo = require('./mongo');
var mock1 = require('../api/v1/mock1').data;
var mock2 = require('../api/v1/mock2').data;

mongo.runQuery('game_levels', 'update', {}, { $set: mock1 }).then(console.log);

mongo.runQuery('game_levels', 'insert', mock2).then(console.log);
