'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pago = sequelize.define('Pago', {
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['pendiente', 'cancelado', 'pagado']],
      },
    },
    fechaVencimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    
  });

  Pago.associate = (models) => {
    Pago.belongsTo(models.Apartamento, {
      foreignKey: 'apartamentoId',
      as: 'apartamento',
    });

    Pago.belongsTo(models.Propietario, {
      foreignKey: 'propietarioId',
      as: 'propietario',
    });
  };

  return Pago;
};