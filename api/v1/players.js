var route = require('express').Router();
var knex = require('../../db/knex');
var sockets = require('../../services/socket');

module.exports = route;

route.get('/:id', function(request, response, next) {
  knex('players')
  .where({ id: request.params.id }).then(function(players) {
    players.forEach(player=> delete player.phone_number);
    response.json({ players: players });
  }).catch(next);
});

route.get('/', function(request, response, next) {
  Promise.all([
    knex('players'),
    knex('players').select('players.*', 'games.player1_id', 'games.player2_id', 'games.last_updated')
    .innerJoin('games', 'players.id', 'player1_id')
    .where('player1_id', request.user.id).orWhere('player2_id', request.user.id)
  ]).then(function(results) {
    var players = results[0];
    var online = sockets.userList();
    players.forEach(function(player) {
      delete player.phone_number
      player.online = !!online.find((each) => each.id == player.id);
      player.encountered = (results[1].find(function(each) {
        return each.player1_id == player.id || each.player2_id == player.id;
      }) || {}).last_updated;
    });
    response.json({ players: players });
  }).catch(next);
});
