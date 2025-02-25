const express = require('express');
const router = express.Router();
const authController = require('../controllers/autnController');
const authMiddleware = require('../middlewares/authmiddlewares');

// Registrar un nuevo usuario
router.post('/register', authController.register);

// Iniciar sesión
router.post('/login', authController.login);

// Cerrar sesión (requiere autenticación)
router.post('/logout', authMiddleware, authController.logout);

// Verificar el token JWT
router.get('/verify', authController.verifyToken);

module.exports = router;