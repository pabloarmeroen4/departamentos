const { Informe, Usuario } = require('../models');

exports.crearInforme = async (req, res) => {
  try {
    const { cargo, motivo, descripcion, estado, emisorId } = req.body;

    const nuevoInforme = await Informe.create({
      cargo,
      motivo,
      descripcion,
      estado,
      emisorId,
    });
    return res.status(201).json(nuevoInforme);
  } catch (error) {
    console.error("Error al crear el informe:", error);
    return res.status(500).json({ error: "Hubo un error al crear el informe.", detalles: error.message });
  }
};

exports.getInformes = async (req, res) => {
  try {
    const informes = await Informe.findAll({
      include: {
        model: Usuario,
        as: 'emisor',
        attributes: ['nombre', 'id', 'rol'],
      },
    });

    return res.status(200).json(informes);
  } catch (error) {
    console.error("Error al obtener los informes:", error);
    return res.status(500).json({
      error: "Hubo un error al obtener los informes.",
      detalles: error.message,
    });
  }
};

exports.getInforme = async (req, res) => {
  try {
    const { id } = req.params;

    const informe = await Informe.findByPk(id, {
      include: {
        model: Usuario,
        as: 'emisor',
        attributes: ['nombre', 'id'],
      },
    });

    if (!informe) {
      return res.status(404).json({ error: "Informe no encontrado" });
    }

    return res.status(200).json(informe);
  } catch (error) {
    console.error("Error al obtener el informe:", error);
    return res.status(500).json({
      error: "Hubo un error al obtener el informe.",
      detalles: error.message,
    });
  }
};

exports.actualizarInforme = async (req, res) => {
  try {
    const { id } = req.params;
    const { cargo, motivo, descripcion, estado, emisorId } = req.body;

    const informe = await Informe.findByPk(id);

    if (!informe) return res.status(404).json({ error: "Informe no encontrado" });

    informe.cargo = cargo || informe.cargo;
    informe.motivo = motivo || informe.motivo;
    informe.descripcion = descripcion || informe.descripcion;
    informe.estado = estado || informe.estado;
    informe.emisorId = emisorId || informe.emisorId;

    await informe.save();

    return res.status(200).json(informe);
  } catch (error) {
    console.error("Error al actualizar el informe:", error);
    return res.status(500).json({ error: "Hubo un error al actualizar el informe.", detalles: error.message });
  }
};

exports.eliminarInforme = async (req, res) => {
  try {
    const { id } = req.params;
    const informe = await Informe.findByPk(id);

    if (!informe) return res.status(404).json({ error: "Informe no encontrado" });

    await informe.destroy();

    return res.status(200).json({ message: "Informe eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el informe:", error);
    return res.status(500).json({ error: "Hubo un error al eliminar el informe.", detalles: error.message });
  }
};

exports.actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const informe = await Informe.findByPk(id);
    if (!informe) {
      return res.status(404).json({ message: "Informe no encontrado" });
    }

    informe.estado = estado || informe.estado;
    await informe.save();

    res.json(informe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el informe" });
  }
};

exports.getInformesPoremisor = async (req, res) => {
  try {
    const { emisorId } = req.params;

    if (!emisorId) {
      return res.status(400).json({ error: "El parámetro emisorId es requerido." });
    }

    const informes = await Informe.findAll({
      where: {
        emisorId: emisorId,
      },
      include: {
        model: Usuario,
        as: 'emisor',
        attributes: ['name', 'id', 'role'],
      },
    });

    if (!informes.length) {
      return res.status(404).json({
        error: "No se encontraron informes para este emisor.",
      });
    }

    return res.status(200).json(informes);
  } catch (error) {
    console.error("Error al obtener informes:", error);
    return res.status(500).json({
      error: "Hubo un error al obtener los informes.",
      detalles: error.message,
    });
  }
};