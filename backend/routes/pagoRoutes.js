const express = require('express');
const router = express.Router();
const { 
  crearPago, 
  obtenerPagos, 
  obtenerPago, 
  actualizarPago, 
  eliminarPago 
} = require('../controllers/pagoController');

// Crear un nuevo pago
router.post('/pago', crearPago);

// Obtener todos los pagos
router.get('/pago', obtenerPagos);

// Obtener un pago por su ID
router.get('/pago/:id', obtenerPago);

// Actualizar un pago por su ID
router.put('/pago/:id', actualizarPago);

// Eliminar un pago por su ID
router.delete('/pago/:id', eliminarPago);

module.exports = router;