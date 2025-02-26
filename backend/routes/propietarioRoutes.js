const express = require('express');
const router = express.Router();
const propietarioController = require('../controllers/propietarioController');

// Crear un nuevo propietario
router.post('/propietario', propietarioController.createPropietario);

// Obtener todos los propietarios
router.get('/propietario', propietarioController.getAllPropietarios);
// Obtener un propietario por su ID
router.get('/propietario/:id', propietarioController.getPropietarioById);

// Actualizar un propietario por su ID
router.put('/propietario/:id', propietarioController.updatePropietario);

// Eliminar un propietario por su ID
router.delete('/propietario/:id', propietarioController.deletePropietario);

module.exports = router;