'use strict';

const bcrypt = require('bcryptjs');

// Definir roles como constantes para evitar errores tipográficos
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
        notEmpty: {
          msg: 'El nombre no puede estar vacío.',
        },
        len: {
          args: [2, 100],
          msg: 'El nombre debe tener entre 2 y 100 caracteres.',
        },
      },
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'La cédula no puede estar vacía.',
        },
        len: {
          args: [5, 20],
          msg: 'La cédula debe tener entre 5 y 20 caracteres.',
        },
      },
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El teléfono no puede estar vacío.',
        },
        len: {
          args: [7, 15],
          msg: 'El teléfono debe tener entre 7 y 15 caracteres.',
        },
      },
    },
    usuarioId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'El ID de usuario no puede estar vacío.',
        },
        len: {
          args: [3, 50],
          msg: 'El ID de usuario debe tener entre 3 y 50 caracteres.',
        },
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La contraseña no puede estar vacía.',
        },
        len: {
          args: [6, 100],
          msg: 'La contraseña debe tener entre 6 y 100 caracteres.',
        },
      },
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [[ROLES.ADMINISTRADOR, ROLES.PERSONAL_SEGURIDAD]],
          msg: 'El rol debe ser "administrador" o "personal de seguridad".',
        },
      },
    },
  }, {
    hooks: {
      beforeCreate: async (usuario) => {
        try {
          if (usuario.contrasena) {
            usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
          }
        } catch (error) {
          throw new Error('Error al hashear la contraseña.');
        }
      },
    },
  });

  // Método para validar la contraseña
  Usuario.prototype.validatePassword = async function(contrasena) {
    try {
      return await bcrypt.compare(contrasena, this.contrasena);
    } catch (error) {
      throw new Error('Error al validar la contraseña.');
    }
  };

  return Usuario;
};