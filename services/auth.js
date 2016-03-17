var route = require('express').Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');

module.exports = route;

route.use(function(request, response, next) {
  var token = (request.headers.authorization || '').slice('Bearer '.length);
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    request.user = (decoded && decoded.exp < Date.now()) ? decoded.user : null;
    next();
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/gplus/callback'
}, function(accessToken, refreshToken, profile, done) {
  incorporateUser(profile, done).catch(done);
}));

function incorporateUser(profile, done) {
  return getOrCreateUser(profile).then(function(users) {
    var data = { user: users[0] }, secret = process.env.TOKEN_SECRET;
    jwt.sign(data, secret, { expiresIn: '30d' }, function(token) {
      done(null, token);
    });
  });
}

function getOrCreateUser(profile) {
  return knex('players').where('social_id', profile.id).then(function(users) {
    var user = users[0];
    if (user) {
      return updateUser(user, profile);
    } else {
      return createUser(profile);
    }
  });
}

function updateUser(user, profile) {
  return knex('players').returning('*').where({ id: user.id }).update({
    name: profile.displayName || '',
    image: digest(profile.photos),
    email: digest(profile.emails)
  }).then(function(users) {
    return knex('players').where({ id: user.id });
  });
}

function createUser(profile) {
  return knex('players').returning('*').insert({
    social_id: profile.id,
    name: profile.displayName,
    image: digest(profile.photos),
    email: digest(profile.emails)
  }).then(function(users) {
    return knex('players').where({ social_id: profile.id });
  });
}

function digest(items) {
  var item = items[items.length - 1];
  var value = popSz(item ? item.value : '');
  return value;
}

function popSz(string) {
  var array = string.split('?');
  if (array.length > 1) array.pop();
  return array.join('?');
}
