const express = require('express');
const router = express.Router();
const visitanteController = require('../controllers/visitantesController');

// Obtener todos los visitantes
router.get('/visitante', visitanteController.obtenerVisitantes);

// Obtener un visitante por su ID
router.get('/visitante/:id', visitanteController.obtenerVisitante);

// Crear un nuevo visitante
router.post('/visitante/', visitanteController.crearVisitante);

// Actualizar un visitante por su ID
router.put('/visitante/:id', visitanteController.actualizarVisitante);

// Eliminar un visitante por su ID
router.delete('/visitante/:id', visitanteController.eliminarVisitante);

module.exports = router;