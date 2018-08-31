'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EquipmentManages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barcode: {
        type: Sequelize.INTEGER,
        unique: true
      },
      boughtAt: Sequelize.DATEONLY,
      isBorrowed: Sequelize.BOOLEAN,
      borrowedBy: Sequelize.STRING,
      borrowedAt: Sequelize.DATEONLY,
      returnedBy: Sequelize.STRING,
      returnedBy: Sequelize.DATEONLY,
      remark: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EquipmentManages');
  }
};
