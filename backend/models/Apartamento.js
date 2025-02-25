'use strict';

module.exports = (sequelize, DataTypes) => {
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
      validate: {
        isIn: [['ocupado', 'desocupado', 'mantenimiento']],
      },
    },
  });

  Apartamento.associate = (models) => {
    Apartamento.belongsTo(models.Propietario, {
      foreignKey: 'propietarioId',
      as: 'propietario',
    });

    Apartamento.hasMany(models.Visitante, {
      foreignKey: 'apartamentoId',
      as: 'visitantes',
    });

    Apartamento.hasMany(models.Pago, {
      foreignKey: 'apartamentoId',
      as: 'pagos',
    });
  };

  return Apartamento;
};