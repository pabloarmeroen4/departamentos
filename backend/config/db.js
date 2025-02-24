const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Villa-sol', 'root', '1061692751', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;