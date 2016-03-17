var route = require('express').Router();
var knex = require('../../db/knex');
var mongo = require('../../db/mongo');
var sockets = require('../../services/socket');

module.exports = route;

// if (process.env.NODE_ENV !== 'production') {
  var mock1 = require('./games-test');
  route.use('/mock1', mock1);
// }

route.post('/', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    var isPlayer1 = request.body.is_player1 === 'false' ? false : !!request.body.is_player1;
    var player1 = isPlayer1 ? request.user.id : request.body.other_player_id;
    var player2 = isPlayer1 ? request.body.other_player_id : request.user.id;
    return createGame(request.user, request.body.level_id, player1, player2)
    .then(sendMessage).then(function() {
      response.json({ message: 'request sent' });
    });
  }).catch(next);
});

route.post('/levels', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    if (request.user.id < 3) {
      var level = {
        name: request.body.name,
        state: request.body.state,
        creator_id: request.user.id
      };
      return mongo.runQuery('game_levels', 'insert', level)
      .then(function(results) {
        response.json({ message: 'level inserted', _id: results[0]._id.toString() });
      });
    } else return Promise.reject('Creating levels not allowed at this time.');
  }).catch(next);
});

route.put('/levels/:id', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    if (request.user.id < 3) {
      var where = { _id: mongo.ObjectId(request.params.id) };
      var data = { $set: { state: request.body.state } };
      return mongo.runQuery('game_levels', 'update', where, data)
      .then(function(results) {
        response.json({ message: 'level updated' });
      });
    } else return Promise.reject('Creating levels not allowed at this time.');
  }).catch(next);
});

route.get('/levels', function(request, response, next) {
  return Promise.all([
    mongo.runQuery('game_levels', 'find', {}),
    knex('players')
  ]).then(function (results) {
    var levels = results[0], players = results[1];
    levels.forEach(level=> level.creator = players.find(player=> player.id == level.creator_id));
    response.json({ levels: levels });
  }).catch(next);
});

route.get('/invitations', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    return Promise.all([
      gamesQuery().whereNot({ creator_id: request.user.id })
      .andWhere({ 'game_statuses.status': 'not started' })
      .andWhere(function() {
        this.where({ player1_id: request.user.id }).orWhere({ player2_id: request.user.id });
      }),
      mongo.runQuery('game_states', 'find', {})
    ]).then(function(results) {
      return Promise.all([
        processGames(results[0]),
        Promise.resolve(results[1])
      ]);
    }).then(function(results) {
      var games = results[0];
      var levels = results[1];
      games.forEach(function(game) {
        game.level = levels.find(level=> level._id.toString() == game.game_state_id) || {};
        delete game.level.states;
      });
      response.json({ games: games });
    });
  }).catch(next);
});

route.get('/pending', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    return Promise.all([
      gamesQuery()
      .where({ creator_id: request.user.id, 'game_statuses.status': 'not started' }),
      mongo.runQuery('game_states', 'find', {})
    ]).then(function(results) {
      return Promise.all([
        processGames(results[0]), Promise.resolve(results[1])
      ]);
    }).then(function(results) {
      var games = results[0];
      var levels = results[1];
      games.forEach(function(game) {
        game.level = levels.find(level=> level._id.toString() == game.game_state_id) || {};
        delete game.level.states;
      });
      response.json({ games: games });
    });
  }).catch(next);
});

route.get('/active', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    return gamesQuery()
    .whereIn('game_statuses.status', ['player1 turn', 'player2 turn'])
    .andWhere(function() {
      this.where({ 'player1_id': request.user.id })
      .orWhere({ 'player2_id': request.user.id });
    }).then(processGames).then(function(games) {
      response.json({ games: games });
    });
  }).catch(next);
});

route.get('/completed', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    return gamesQuery().where('game_statuses.status', 'completed')
    .andWhere(function() {
      this.where({ 'player1_id': request.user.id })
      .orWhere({ 'player2_id': request.user.id });
    }).then(processGames).then(function(games) {
      response.json({ games: games });
    });
  }).catch(next);
});

route.get('/rejected', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    return gamesQuery()
    .where({ 'game_statuses.status': 'rejected', 'creator_id': request.user.id })
    .then(processGames).then(function(games) {
      response.json({ games: games });
    });
  }).catch(next);
});

route.get('/:id', function(request, response, next) {
  gamesQuery().where({ 'games.id': request.params.id })
  .then(processGames).then(function(games) {
    if (games.length) {
      return mongo.runQuery('game_states', 'find', { _id: mongo.ObjectId(games[0].game_state_id) })
      .then(function(states) {
        var state = states[0].states[states[0].states.length - 1];
        var game = joinObjects(games[0], state);
        response.json({ games: [game] });
      });
    } else {
      response.json({ games: [] });
    }
  }).catch(next);
});

route.put('/accept/:id', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    return acceptGame(request.user.id, request.params.id).then(sendMessage).then(function() {
      response.json({ message: 'game accepted' });
    });
  }).catch(next);
});

route.put('/move/:id', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    return makeMove(request.user.id, request.params.id, request.body)
    .then(function(result) {
      return request.body.completed ? completeGame(result) : updateGame(result);
    }).then(sendMessage).then(function() {
      response.json({ message: 'game updated' });
    });
  }).catch(next);
});

route.put('/reject/:id', function(request, response, next) {
  ifLoggedIn(request.user, function() {
    return rejectGame(request.user.id, request.params.id).then(sendMessage).then(function() {
      response.json({ message: 'game rejected' });
    });
  }).catch(next);
});

function createGame(user, levelId, player1, player2) {
  return getLevel(levelId, player1, player2, user.id)
  .then(addGameRecord)
  .then(prepareData(user, player1, player2));
}

function getLevel(levelId, player1, player2, creator) {
  return mongo.openDB().then(function(db) {
    return mongo.withOpen(db, 'game_levels', 'find', { _id: mongo.ObjectId(levelId) })
    .then(function(results) {
      return Promise.resolve({
        db: db,
        level: results[0],
        player1: player1,
        player2: player2,
        creator: creator
      });
    });
  });
}

function addGameRecord(data) {
  var player1 = data.player1, player2 = data.player2, creator = data.creator;
  var record = {
    creator_id: creator,
    level_id: data.level._id.toString(),
    name: data.level.name,
    states: [data.level.state],
    thumbnail: data.level.thumbnail
  };
  return Promise.all([
    mongo.withOpen(data.db, 'game_states', 'insert', record),
    knex('game_statuses')
  ]).then(function(results) {
    data.db.close();
    var status = results[1].find(status => status.status == 'not started');
    return knex('games').insert({
      player1_id: player1,
      player2_id: player2,
      creator_id: creator,
      last_updated: new Date(),
      game_status_id: status.id,
      game_state_id: results[0][0]._id.toString()
    }).returning('id').then(function(ids) {
      return gamesQuery().where({ 'games.id': ids[0] });
    }).then(function(games) {
      return Promise.resolve(joinObjects(games[0], results[0][0]));
    });
  });
}

function acceptGame(userId, gameId) {
  return respondToGame(userId, gameId, 'player1 turn', 'accept game', 'Your invitation has been accepted.');
}

function rejectGame(userId, gameId) {
  return respondToGame(userId, gameId, 'rejected', 'reject game', 'Your invitation has been rejected.', 'An invitation you\'ve received has been canceled');
}

function respondToGame(userId, gameId, newStatus, channel, message, altMessage) {
  return knex('game_statuses').then(function(statuses) {
    var status = statuses.find(status => status.status == newStatus);
    var notStarted = statuses.find(status => status.status == 'not started');
    return knex('games').update({ game_status_id: status.id })
    //.whereNot({ creator_id: userId })
    .where({ id: gameId, game_status_id: notStarted.id })
    .andWhere(function() {
      this.where({ player1_id: userId }).orWhere({ player2_id: userId });
    });
  }).then(function() {
    return knex('games').where({ id: gameId }).then(function(games) {
      var otherPlayer = getOtherPlayer(userId, games[0].player1_id, games[0].player2_id);
      message = games[0].creator_id == otherPlayer ? message : altMessage;
      return Promise.resolve({
        sendId: otherPlayer, channel: channel, data: { message: message, id: gameId }
      });
    });
  });
}

function makeMove(userId, gameId, state) {
  var remove = ['player1', 'player2', 'creator', 'game_status', 'game_status_id'];
  var mongoState = trimObject(state.state, remove);
  return Promise.resolve({
    state: mongoState,
    userId: userId,
    gameId: gameId
  });
}

function updateGame(data) {
  return Promise.all([
    gamesQuery().where({ 'games.id': data.gameId }).andWhere(function() {
      this.where({ player1_id: data.userId, 'game_statuses.status': 'player1 turn' })
      .orWhere({ player2_id: data.userId, 'game_statuses.status': 'player2 turn' });
    }),
    knex('game_statuses')
  ]).then(function(results) {
    var game = results[0][0];
    if (game) {
      var searchString = (game.game_status == 'player1 turn' ? 'player2 turn' : 'player1 turn');
      var status = results[1].find(status => status.status == searchString);
      return Promise.all([
        knex('games').update({ game_status_id: status.id, last_updated: new Date() })
        .where({ id: data.gameId }),
        mongo.openDB().then(function(db) {
          var search = { _id: mongo.ObjectId(game.game_state_id) };
          return mongo.withOpen(db, 'game_states', 'findOne', search)
          .then(function(results) {
            return mongo.withOpen(db, 'game_states', 'update', search, {
              $set: {
                states: results[0].states.concat(data.state)
              }
            })
          }).then(function() {
            db.close();
          });
        })
      ]).then(function() {
        var otherPlayer = getOtherPlayer(data.userId, game.player1_id, game.player2_id);
        return Promise.resolve({
          sendId: otherPlayer,
          channel: 'game updated',
          data: {
            message: 'One of your games has been updated.',
            id: data.gameId
          }
        });
      });
    } else return Promise.reject('You cannot modify this game.');
  });
}

function completeGame(data) {
  return Promise.all([
    gamesQuery().where({ 'games.id': data.gameId }).andWhere(function() {
      this.where({ player1_id: data.userId, 'game_statuses.status': 'player1 turn' })
      .orWhere({ player2_id: data.userId, 'game_statuses.status': 'player2 turn' });
    }),
    knex('game_statuses')
  ]).then(function(results) {
    var game = results[0][0];
    if (game) {
      var status = results[1].find(status => status.status == 'completed');
      return Promise.all([
        knex('games').update({ game_status_id: status.id, last_updated: new Date() })
        .where({ id: data.gameId }),
        mongo.openDB().then(function(db) {
          var search = { _id: mongo.ObjectId(game.game_state_id) };
          return mongo.withOpen(db, 'game_states', 'findOne', search)
          .then(function(results) {
            return mongo.withOpen(db, 'game_states', 'update', search, {
              $set: {
                states: results[0].states.concat(data.state)
              }
            })
          }).then(function() {
            db.close();
          });
        })
      ]).then(function() {
        var otherPlayer = getOtherPlayer(data.userId, game.player1_id, game.player2_id);
        return Promise.resolve({
          sendId: otherPlayer,
          channel: 'game completed',
          data: {
            message: 'One of your games has been completed!',
            id: data.gameId
          }
        });
      });
    } else return Promise.reject('You cannot modify this game.');
  });
}

function prepareData(user, player1, player2) {
  return function(data) {
    data.message = 'You have received a new invitation';
    return Promise.resolve({
      sendId: getOtherPlayer(user.id, player1, player2),
      channel: 'new invitation',
      data: data
    });
  };
}

function sendMessage(data) {
  sockets.send(data.sendId, data.channel, data.data);
  return Promise.resolve();
}

function gamesQuery() {
  return knex('games').select('games.*', 'game_statuses.status as game_status',
  'player1.email as player1_email', 'player2.email as player2_email',
  'player1.social_id as player1_social_id', 'player2.social_id as player2_social_id',
  'player1.image as player1_image', 'player2.image as player2_image',
  'player1.name as player1_name', 'player2.name as player2_name')
  .innerJoin('players as player1', 'player1.id', 'games.player1_id')
  .innerJoin('players as player2', 'player2.id', 'games.player2_id')
  .innerJoin('game_statuses', 'games.game_status_id', 'game_statuses.id');
}

function processGames (games) {
  games.forEach(nestObject('player1'));
  games.forEach(nestObject('player2'));
  games.forEach(markCreator);
  return games;
}

function nestObject(predicate) {
  return function(object) {
    var newProperty = {};
    Object.keys(object).forEach(function(key) {
      if (key.substring(0, predicate.length) == predicate) {
        var abbreviatedKey = key.split('_');
        abbreviatedKey.shift();
        abbreviatedKey = abbreviatedKey.join('_');
        newProperty[abbreviatedKey] = object[key];
        delete object[key];
      }
    });
    object[predicate] = newProperty;
  };
}

function markCreator(object) {
  if (object.creator_id == object.player1.id) {
    object.creator = object.player1;
  } else {
    object.creator = object.player2;
  }
  delete object.creator_id;
}

function ifLoggedIn(user, func) {
  if (user) {
    return func();
  } else {
    return Promise.reject('You must be logged in');
  }
}

function joinObjects(startObject, addObject) {
  var combined = Object.keys(startObject).reduce(function(object, key) {
    object[key] = startObject[key];
    return object;
  }, {});
  return Object.keys(addObject).reduce(function(object, key) {
    object[key] = addObject[key];
    return object;
  }, combined);
}

function trimObject(object, keys) {
  return Object.keys(object).reduce(function(newObject, key) {
    if (keys.indexOf(key) == -1) newObject[key] = object[key];
    return newObject;
  }, {});
}

function getOtherPlayer(me, player1, player2) {
  return me == player1 ? player2 : player1;
}
