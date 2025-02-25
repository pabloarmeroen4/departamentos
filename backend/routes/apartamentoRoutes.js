const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamentoController');

router.get('/', apartamentoController.getApartamentos);
router.post('/', apartamentoController.crearApartamento);

module.exports = router;