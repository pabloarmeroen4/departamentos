const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const Propietario = require('./Propietario');
const Apartamento = require('./Apartamento');
const Visitante = require('./Visitante');
const Usuario = require('./Usuario');
const Pago = require('./Pago');
const Informe = require('./Informe');

// Relaciones entre modelos
Propietario.hasMany(Apartamento, { foreignKey: 'propietarioId' });
Apartamento.belongsTo(Propietario, { foreignKey: 'propietarioId' });

Apartamento.hasMany(Visitante, { foreignKey: 'apartamentoId' });
Visitante.belongsTo(Apartamento, { foreignKey: 'apartamentoId' });

Apartamento.hasMany(Pago, { foreignKey: 'apartamentoId' });
Pago.belongsTo(Apartamento, { foreignKey: 'apartamentoId' });

Propietario.hasMany(Pago, { foreignKey: 'propietarioId' });
Pago.belongsTo(Propietario, { foreignKey: 'propietarioId' });

Usuario.hasMany(Informe, { foreignKey: 'emisorId' });
Informe.belongsTo(Usuario, { foreignKey: 'emisorId' });

module.exports = {
  sequelize,
  Propietario,
  Apartamento,
  Visitante,
  Usuario,
  Pago,
  Informe,
};