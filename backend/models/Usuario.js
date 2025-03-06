'use strict';

const bcrypt = require('bcryptjs');

const ROLES = {
  ADMINISTRADOR: 'administrador',
  PERSONAL_SEGURIDAD: 'personal de seguridad',
};

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre no puede estar vacío.' },
        len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres.' },
      },
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'La cédula no puede estar vacía.' },
        len: { args: [5, 20], msg: 'La cédula debe tener entre 5 y 20 caracteres.' },
      },
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El teléfono no puede estar vacío.' },
        len: { args: [7, 15], msg: 'El teléfono debe tener entre 7 y 15 caracteres.' },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La contraseña no puede estar vacía.' },
        len: { args: [6, 100], msg: 'La contraseña debe tener entre 6 y 100 caracteres.' },
      },
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: { args: [[ROLES.ADMINISTRADOR, ROLES.PERSONAL_SEGURIDAD]], msg: 'El rol debe ser "administrador" o "personal de seguridad".' },
      },
    },
  }, {
    tableName: 'usuarios', // Asegura que Sequelize use la tabla correcta
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.contraseña) {
          usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
        }
      },
    },
  });

  Usuario.prototype.validatePassword = async function (contraseña) {
    return this.contraseña ? await bcrypt.compare(contraseña, this.contraseña) : false;
  };

  return Usuario;
};
