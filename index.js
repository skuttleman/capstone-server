try {
  require('dotenv').load();
} catch (err) {
  console.error(err);
}

var express = require('express'), app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', request.headers.origin);
  response.header('Access-Control-Allow-Headers', 'Authorization');
  response.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(require('./services/socket')(server));

app.use(require('./services/auth'));
app.use('/auth', require('./api/auth'));
app.use(function(request, response, next) {
  if (request.user || request.method == 'OPTIONS') next();
  else next(new Error('You must have valid credentials to use this API'));
});

app.use('/api', require('./api/api'));

server.listen(port, function() {
  console.log('The server is listening on port', port);
});


app.use(function(err, request, response, next) {
  response.status(err.status || 500);
  response.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});
