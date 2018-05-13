'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('BookManages', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        isbn: {
          type: Sequelize.INTEGER,
          unique: true
        },
        boughtAt: Sequelize.DATE,
        stock: Sequelize.INTEGER,
        borrowedBy: Sequelize.STRING,
        borrowedAt: Sequelize.DATE,
        returnedBy: Sequelize.STRING,
        returnedAt: Sequelize.DATE,
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BookManages');
  }
};
