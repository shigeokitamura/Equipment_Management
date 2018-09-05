// Require all the stuff
const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];

// Setup sequelize db connection
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const EquipmentInfo = sequelize.define('EquipmentInfo', {
  barcode: {
    type: Sequelize.INTEGER,
    unique: true
  },
  name: Sequelize.TEXT,
  label: Sequelize.TEXT,
  categories: Sequelize.TEXT,
  thumbnail: Sequelize.TEXT
});

const EquipmentManage = sequelize.define('EquipmentManage', {
  barcode: {
    type: Sequelize.INTEGER,
    unique: true
  },
  boughtAt: Sequelize.DATEONLY,
  isBorrowed: Sequelize.BOOLEAN,
  borrowedBy: Sequelize.TEXT,
  borrowedAt: Sequelize.DATEONLY,
  returnedBy: Sequelize.TEXT,
  returnedAt: Sequelize.DATEONLY,
  remark: Sequelize.TEXT
});

module.exports.info = EquipmentInfo;
module.exports.manage = EquipmentManage;
