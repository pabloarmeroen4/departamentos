const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Apartamento = sequelize.define('Apartamento', {
  numApt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  torre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Apartamento;