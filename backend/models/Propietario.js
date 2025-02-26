'use strict';

module.exports = (sequelize, DataTypes) => {
  const Propietario = sequelize.define('Propietario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Propietario.associate = (models) => {

    Propietario.hasMany(models.Pago, {
      foreignKey: 'propietarioId',
      as: 'pagos',
    });

    Propietario.hasOne(models.Apartamento, {
      foreignKey: 'propietarioId',
      as: 'apartamento'
    });
    
  };

  return Propietario;
};