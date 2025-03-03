'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Informe = sequelize.define('Informe', {
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['leido', 'no leido']],
      },
    },
  });

  Informe.associate = (models) => {
    Informe.belongsTo(models.Usuario, {
      foreignKey: 'emisorId',
      as: 'emisor',
    });
  };

  return Informe;
};