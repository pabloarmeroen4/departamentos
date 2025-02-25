import express from 'express';
import {
    obtenerTodosLosPropietarios,
    obtenerPropietarioPorId,
    crearPropietario,
    actualizarPropietario,
    eliminarPropietario,
    obtenerApartamentosDePropietario,
    obtenerPagosDePropietario,
    obtenerVisitantesDePropietario
} from '../controllers/propietarioController.js';

const router = express.Router();

router.get('/', obtenerTodosLosPropietarios);
router.get('/:id', obtenerPropietarioPorId);
router.post('/', crearPropietario);
router.put('/:id', actualizarPropietario);
router.delete('/:id', eliminarPropietario);
router.get('/:id/apartamentos', obtenerApartamentosDePropietario);
router.get('/:id/pagos', obtenerPagosDePropietario);
router.get('/:id/visitantes', obtenerVisitantesDePropietario);

export default router;