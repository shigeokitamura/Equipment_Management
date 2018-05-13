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
        title: Sequelize.STRING,
        authors: Sequelize.STRING,
        description: Sequelize.STRING,
        categories: Sequelize.STRING,
        thumbnail: Sequelize.STRING,
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
