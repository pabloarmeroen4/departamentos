const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = 'tu_secreto_jwt';

exports.register = async (req, res) => {
  try {
    const { name, cedula, phone, username, password, role } = req.body;

    const user = await User.create({
      name,
      cedula,
      phone,
      username,
      password,
      role
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        cedula: user.cedula,
        phone: user.phone,
        username: user.username
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await user.validatePassword(password);
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
        name: user.name,
        username: user.username,
        role: user.role,
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

      const userFound = await User.findOne({ where: { id: decoded.id } });
      if (!userFound) {
        return res.status(401).json({ message: "No autorizado" });
      }

      return res.json({
        id: userFound.id,
        name: userFound.name,
        cedula: userFound.cedula,
        phone: userFound.phone,
        role: userFound.role
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};