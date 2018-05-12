/* /models/user.js */

// Require all the stuff
const Sequelize = require('sequelize');
//var passportLocalSequelize = require('passport-local-sequelize');
const env       = process.env.NODE_ENV || "development";
const config    = require(__dirname + '/../config/config.json')[env];

// Setup sequelize db connection
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const BookInfo = sequelize.define('BookInfo', {
  isbn: {
    type: Sequelize.INTEGER,
    unique: true
  },
  title: Sequelize.STRING,
  authors: Sequelize.STRING,
  description: Sequelize.STRING,
  categories: Sequelize.STRING,
  thumbnail: Sequelize.STRING
});

const BookManage = sequelize.define('BookManage', {
  isbn: {
    type: Sequelize.INTEGER,
    unique: true
  },
  boughtAt: Sequelize.DATE,
  stock: Sequelize.INTEGER,
  borrowedBy: Sequelize.STRING,
  borrowedAt: Sequelize.DATE,
  returnedBy: Sequelize.STRING,
  returnedAt: Sequelize.DATE
});

module.exports = Book;
