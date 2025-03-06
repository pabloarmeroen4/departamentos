const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // Modelo de Sequelize
require('dotenv').config(); // Cargar variables de entorno

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt';

const authController = {
  async register(req, res) {
    try {
      const { nombre, cedula, telefono, contraseña, rol } = req.body;

      // Verificar si la cédula ya está registrada
      const existingUser = await Usuario.findOne({ where: { cedula } });
      if (existingUser) {
        return res.status(400).json({ message: 'La cédula ya está registrada' });
      }

      const usuario = await Usuario.create({ nombre, cedula, telefono, contraseña, rol });

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          cedula: usuario.cedula,
          telefono: usuario.telefono,
          rol: usuario.rol
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { cedula, contraseña } = req.body; // Ahora usa cédula en lugar de nombre para mayor seguridad

      const usuario = await Usuario.findOne({ where: { cedula } });
      if (!usuario) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const isValidPassword = await usuario.validatePassword(contraseña);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1d' });

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 día
      });

      res.json({
        message: 'Inicio de sesión exitoso',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          rol: usuario.rol
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async logout(req, res) {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      expires: new Date(0)
    });
    res.json({ message: 'Cierre de sesión exitoso' });
  },

  async verifyToken(req, res) {
    try {
      const token = req.cookies?.jwt;
      
      if (!token) {
        return res.status(401).json({ message: "No autorizado" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      const usuario = await Usuario.findByPk(decoded.id);

      if (!usuario) {
        return res.status(401).json({ message: "No autorizado" });
      }

      res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        cedula: usuario.cedula,
        telefono: usuario.telefono,
        rol: usuario.rol
      });
    } catch (error) {
      res.status(401).json({ message: "Token inválido o expirado" });
    }
  }
};

module.exports = authController;
