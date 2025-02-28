'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pagos', 'propietarioId');
    await queryInterface.addColumn('pagos', 'propietarioId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'propietarios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pagos', 'propietarioId');
    await queryInterface.addColumn('pagos', 'propietarioId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
};