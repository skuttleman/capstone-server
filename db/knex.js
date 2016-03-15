var config = {
  development: {
    client: 'mysql',
    connection: {
      database: 'tilde',
      user:  'root',
      host: 'localhost',
      port: 3306
    }
  },
  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL
  }
};

var environment = process.env.NODE_ENV || 'development';
module.exports = require('knex')(config[environment]);
