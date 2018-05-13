/* /models/user.js */

// Require all the stuff
const Sequelize = require('sequelize');
//var passportLocalSequelize = require('passport-local-sequelize');
const env       = process.env.NODE_ENV || "development";
const config    = require(__dirname + '/../config/config.json')[env];

// Setup sequelize db connection
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// A helper to define the User model with username, password fields
const User = sequelize.define('User', {
  userid: {
    type: Sequelize.STRING,
    unique: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  grade: Sequelize.INTEGER
});

module.exports = User;
