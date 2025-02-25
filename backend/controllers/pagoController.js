const { Pago, Propietario, Apartamento } = require('../models');

exports.crearPago = async (req, res) => {
  try {
    const { propietarioId, monto, fechaVencimiento, estado } = req.body;

    const propietario = await Propietario.findByPk(propietarioId, {
      include: {
        model: Apartamento,
        as: 'apartamentos',
        attributes: ['id'],
      },
    });

    if (!propietario) {
      return res.status(404).json({ error: 'Propietario no encontrado.' });
    }

    const apartamentoId = propietario.apartamentos.length > 0 ? propietario.apartamentos[0].id : null;

    const nuevoPago = await Pago.create({
      propietarioId,
      apartamentoId,
      monto,
      fechaVencimiento,
      estado,
    });

    return res.status(201).json(nuevoPago);
  } catch (error) {
    console.error('Error al crear el pago:', error);
    return res.status(500).json({
      error: 'Hubo un error al crear el pago.',
      detalles: error.message,
    });
  }
};

exports.obtenerPagos = async (req, res) => {
  try {
    const pagos = await Pago.findAll({
      include: [
        {
          model: Propietario,
          as: 'propietario',
          attributes: ['id', 'nombre'],
        },
        {
          model: Apartamento,
          as: 'apartamento',
          attributes: ['numeroDeApartamento', "bloque"],
        },
      ],
    });

    return res.status(200).json(pagos);
  } catch (error) {
    console.error('Error al obtener los pagos:', error);
    return res.status(500).json({
      error: 'Hubo un error al obtener los pagos.',
      detalles: error.message,
    });
  }
};

exports.obtenerPago = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await Pago.sequelize.query(
      `
      SELECT 
        p.id AS propietarioId,
        p.nombre AS propietarioNombre,
        a.numeroDeApartamento,
        pa.id AS pagoId,
        pa.monto,
        pa.fechaVencimiento,
        pa.estado AS estadoPago
      FROM 
        pagos pa
      LEFT JOIN 
        propietarios p ON pa.propietarioId = p.id
      LEFT JOIN 
        apartamentos a ON a.propietarioId = p.id
      WHERE
        pa.id = :id
      `,
      {
        replacements: { id },
        type: Pago.sequelize.QueryTypes.SELECT,
        raw: true,
      }
    );

    if (pago.length === 0) {
      return res.status(404).json({ error: "Pago no encontrado." });
    }

    return res.status(200).json(pago[0]);
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    return res.status(500).json({ error: "Hubo un error al obtener el pago.", detalles: error.message });
  }
};

exports.actualizarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, fechaVencimiento, estado, apartamentoId, propietarioId } = req.body;

    const pago = await Pago.findByPk(id);

    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado." });
    }

    pago.monto = monto || pago.monto;
    pago.fechaVencimiento = fechaVencimiento || pago.fechaVencimiento;
    pago.estado = estado || pago.estado;
    pago.apartamentoId = apartamentoId || pago.apartamentoId;
    pago.propietarioId = propietarioId || pago.propietarioId;

    await pago.save();

    return res.status(200).json(pago);
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    return res.status(500).json({ error: "Hubo un error al actualizar el pago.", detalles: error.message });
  }
};

exports.eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await Pago.findByPk(id);

    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado." });
    }

    await pago.destroy();

    return res.status(200).json({ message: "Pago eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    return res.status(500).json({ error: "Hubo un error al eliminar el pago.", detalles: error.message });
  }
};