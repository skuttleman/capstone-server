var jwt = require('jsonwebtoken');
var twilio = require('./twilio');

module.exports = function(server) {
  var users = [];//, user;
  var io = require('socket.io')(server);

  module.exports = function(request, response, next) {
    // user = request.user;
    next();
  };
  module.exports.send = sendManager(io);
  module.exports.userList = userList.bind(null, users);

  io.on('connection', function(socket) {
    jwt.verify(socket.handshake.query.token, process.env.TOKEN_SECRET, connectSocket(io, socket));
  });

  return module.exports;
};

function userList(users, user, socket) {
  if (user && socket && !users.find((user) => user.socket.id == socket.id)) {
    users.push({ user: user, socket: socket });
  }
  users = users.filter((user) => user.socket.connected);
  return users.map((user) => user.user);
}

function connectSocket(io, socket) {
  return function(err, decoded) {
    var user = decoded && decoded.user;
    if (user) {
      socket.join(user.id);
      socket.on('talk', function(data) {
        io.to(data.user.id).emit('talk', data.message);
      });
      io.emit('user list', module.exports.userList(user, socket));
      socket.on('disconnect', function() {
        io.emit('user list', module.exports.userList());
      });
    }
  };
}

function sendManager(io) {
  return function(userId, channel, data) {
    var list = module.exports.userList();
    var user = list.find(user=> user.id == userId);
    if (user) {
      io.to(userId).emit(channel, data);
    } else {
      var textMessage = makeTextMessage(channel, data);
      if (textMessage) twilio(userId, textMessage).catch(console.error);
    }
  };
}

function makeTextMessage(channel, data) {
  var creatorId = data.creator_id == data.player1_id ? 1 : 2;
  var otherId = creatorId * -1 + 3;
  var creatorName = data['player' + creatorId + '_name'];
  var otherName = data['player' + otherId + '_name'];

  switch(channel) {
    case 'new invitation':
      return creatorName + ' has invited you to a new game: https://legendoftilde.com';
    case 'game updated':
      return 'Go on. Make your move: https://legendoftilde.com/#/games/' + data.id;
    case 'accept game':
      return otherName + ' has accepted your invitation: https://legendoftilde.com';
    default:
      return;
  }
}
