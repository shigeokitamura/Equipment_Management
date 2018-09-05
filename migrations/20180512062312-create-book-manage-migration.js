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
        boughtAt: Sequelize.DATEONLY,
        stock: Sequelize.INTEGER,
        borrowedBy: Sequelize.TEXT,
        borrowedAt: Sequelize.DATEONLY,
        returnedBy: Sequelize.TEXT,
        returnedAt: Sequelize.DATEONLY,
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
