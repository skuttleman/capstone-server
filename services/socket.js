var jwt = require('jsonwebtoken');

module.exports = function(server) {
  var users = [];//, user;
  var io = require('socket.io')(server);

  module.exports = function(request, response, next) {
    // user = request.user;
    next();
  };
  module.exports.send = function(userId, message, data) {
    io.to(userId).emit(message, data);
  };
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
