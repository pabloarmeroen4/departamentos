const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // Asegúrate de que el modelo se importa como 'Usuario'
const JWT_SECRET = 'tu_secreto_jwt';

exports.register = async (req, res) => {
  try {
    const { nombre, cedula, telefono, contraseña, rol } = req.body;

    const user = await Usuario.create({
      nombre,
      cedula,
      telefono,
      contraseña,
      rol
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        nombre: user.nombre,
        cedula: user.cedula,
        telefono: user.telefono,
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { nombre, contraseña } = req.body;

    const user = await Usuario.findOne({ where: { nombre } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await user.validatePassword(contraseña);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '1d'
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 día
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logged out successfully' });
};

exports.verifyToken = async (req, res) => {
  try {
    const { jwt: token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "No autorizado" });
      }

      const userFound = await Usuario.findOne({ where: { id: decoded.id } });
      if (!userFound) {
        return res.status(401).json({ message: "No autorizado" });
      }

      return res.json({
        id: userFound.id,
        nombre: userFound.nombre,
        cedula: userFound.cedula,
        telefono: userFound.telefono,
        rol: userFound.rol
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};