const express = require('express');
const router = express.Router();
const propietarioController = require('../controllers/propietarioController');

// Crear un nuevo propietario
router.post('/propietarios', propietarioController.createPropietario);

// Obtener todos los propietarios
router.get('/propietarios', propietarioController.getAllPropietarios);
// Obtener un propietario por su ID
router.get('/propietarios/:id', propietarioController.getPropietarioById);

// Actualizar un propietario por su ID
router.put('/propietarios/:id', propietarioController.updatePropietario);

// Eliminar un propietario por su ID
router.delete('/propietarios/:id', propietarioController.deletePropietario);

module.exports = router;