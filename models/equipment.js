// Require all the stuff
const Sequelize = require('sequelize');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '../config/config.json')[env];

// Setup sequelize db connection
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const EquipmentInfo = sequelize.define('EquipmentInfo', {
  barcode: {
    type: Sequelize.INTEGER,
    unique: true
  },
  name: Sequelize.STRING,
  label: Sequelize.STRING,
  categories: Sequelize.STRING,
  thumbnail: Sequelize.STRING
});

const EquipmentManage = sequelize.define('EquipmentManage' {
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
  remark: Sequelize.STRING
});

module.exports.info = EquipmentInfo;
module.exports.manage = EquipmentManage;
