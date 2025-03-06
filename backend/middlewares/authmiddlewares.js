const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // Asegúrate de que el modelo sea el correcto
require('dotenv').config(); // Carga variables de entorno

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt'; // Usa variables de entorno

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // Manejo seguro de cookies

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.usuario = usuario; // Cambié `user` por `usuario` para ser consistente con tu modelo
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
