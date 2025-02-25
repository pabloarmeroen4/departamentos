const { Visitante } = require('../models');

exports.obtenerVisitantes = async (req, res) => {
  try {
    const visitantes = await Visitante.findAll({
      include: {
        model: Visitante.sequelize.models.Apartamento,
        as: 'apartamento',
      },
    });
    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los visitantes.' });
  }
};

exports.obtenerVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id, {
      include: {
        model: Visitante.sequelize.models.Apartamento,
        as: 'apartamento',
      },
    });

    if (!visitante) {
      return res.status(404).json({ error: 'Visitante no encontrado.' });
    }

    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener el visitante.' });
  }
};

exports.crearVisitante = async (req, res) => {
  try {
    const { nombre, cedula, fechaHoraIngreso, fechaHoraSalida, apartamentoId } = req.body;

    if (!nombre || !cedula || !fechaHoraIngreso || !apartamentoId) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    const estado = fechaHoraSalida ? 'terminado' : 'en ejecucion';

    const nuevoVisitante = await Visitante.create({
      nombre,
      cedula,
      fechaHoraIngreso,
      fechaHoraSalida,
      estado,
      apartamentoId,
    });
    res.status(201).json(nuevoVisitante);
  } catch (error) {
    console.error("Error al crear visitante:", error);
    res.status(500).json({ error: 'Hubo un error al crear el visitante.', detalles: error.message });
  }
};

exports.actualizarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, fechaHoraIngreso, fechaHoraSalida, estado, apartamentoId } = req.body;

    const visitante = await Visitante.findByPk(id);
    if (!visitante) {
      return res.status(404).json({ error: 'Visitante no encontrado.' });
    }

    visitante.nombre = nombre || visitante.nombre;
    visitante.cedula = cedula || visitante.cedula;
    visitante.fechaHoraIngreso = fechaHoraIngreso || visitante.fechaHoraIngreso;
    visitante.fechaHoraSalida = fechaHoraSalida || visitante.fechaHoraSalida;
    visitante.estado = estado || visitante.estado;
    visitante.apartamentoId = apartamentoId || visitante.apartamentoId;

    await visitante.save();

    res.status(200).json(visitante);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al actualizar el visitante.' });
  }
};

exports.eliminarVisitante = async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await Visitante.findByPk(id);

    if (!visitante) {
      return res.status(404).json({ error: 'Visitante no encontrado.' });
    }

    await visitante.destroy();
    res.status(200).json({ message: 'Visitante eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al eliminar el visitante.' });
  }
};