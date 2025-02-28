'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn('usuarios', 'username', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      }, { transaction });

      await queryInterface.changeColumn('usuarios', 'contraseña', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn('usuarios', 'username', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }, { transaction });

      await queryInterface.changeColumn('usuarios', 'contraseña', {
        type: Sequelize.STRING,
        allowNull: false
      }, { transaction });
    });
  }
};