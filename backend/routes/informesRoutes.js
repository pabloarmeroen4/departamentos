const express = require('express');
const router = express.Router();
const { 
  crearInforme, 
  getInformes, 
  getInforme, 
  actualizarInforme, 
  eliminarInforme, 
  actualizarEstado, 
  getInformesPorRemitente 
} = require('../controllers/informesController');

// Crear un nuevo informe
router.post('/informes', crearInforme);

// Obtener todos los informes
router.get('/informes', getInformes);

// Obtener un informe por su ID
router.get('/informes/:id', getInforme);

// Obtener informes por ID del remitente
router.get('/remitente/:remitenteId', getInformesPorRemitente);

// Actualizar un informe por su ID
router.put('/informes/:id', actualizarInforme);

// Eliminar un informe por su ID
router.delete('/informes/:id', eliminarInforme);

// Actualizar el estado de un informe por su ID
router.patch('/informes/:id', actualizarEstado);

module.exports = router;