var knex = require('../db/knex');
var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = function(userId, body) {
  return new Promise(function(resolve, reject) {
    knex('players').where({ id: userId }).then(function(users) {
      var phoneNumber = users[0] && users[0].phone_number;
      if (phoneNumber) sms(phoneNumber, body, resolve, reject);
      else reject('no phone number');
    }).catch(reject);
  });
};

function sms(phoneNumber, body, resolve, reject) {
  client.messages.create({
    from: process.env.TWILIO_PHONE_NUM,
    to: '+1' + phoneNumber,
    body: body
  }, function(err, message) {
    if (err) reject(err);
    else resolve(message);
  });
}
