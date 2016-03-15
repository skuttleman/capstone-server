var route = require('express').Router();
var passport = require('passport');
var knex = require('../db/knex');

module.exports = route;

route.get('/gplus',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] })
);

route.get('/gplus/callback', function(request, response, next) {
  passport.authenticate('google', function(err, token) {
    if (err) console.error(err);
    response.redirect(process.env.CLIENT_HOST + '/#/login?token=' + token);
  })(request, response, next);
});
