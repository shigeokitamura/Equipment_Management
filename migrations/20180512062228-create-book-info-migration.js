'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('BookInfos', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        isbn: {
          type: Sequelize.INTEGER,
          unique: true
        },
        title: Sequelize.TEXT,
        authors: Sequelize.TEXT,
        description: Sequelize.TEXT,
        categories: Sequelize.TEXT,
        thumbnail: Sequelize.TEXT,
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BookInfos');
  }
};
