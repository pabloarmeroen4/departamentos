const { Apartamento, Propietario } = require('../models');

exports.getApartamentos = async (req, res) => {
  try {
    const apartamentos = await Apartamento.findAll({
      include: {
        model: Propietario,
        as: 'propietario',
        attributes: ['nombre']
      }
    });
    res.json(apartamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApartamentosSinPropietario = async (req, res) => {
  try {
    const apartamentos = await Apartamento.findAll({
      where: {
        propietarioId: null,
      },
      attributes: ['id', 'numeroDeApartamento', 'bloque', 'createdAt'],
    });
    res.status(200).json(apartamentos);
  } catch (error) {
    res.status(500).json({
      error: 'Hubo un error al obtener los apartamentos sin propietario.',
      detalles: error.message,
    });
  }
};

exports.getApartamento = async (req, res) => {
  try {
    const apartamento = await Apartamento.findByPk(req.params.id, {
      include: {
        model: Propietario,
        as: 'propietario',
        attributes: ['name']
      }
    });
    if (!apartamento) return res.status(404).json({ error: "Apartamento no encontrado" });
    res.json(apartamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearApartamento = async (req, res) => {
  try {
    const { numeroDeApartamento, bloque, metros, estado, propietarioId } = req.body;
    const nuevoApartamento = await Apartamento.create({
      numeroDeApartamento,
      bloque,
      metros,
      estado,
      propietarioId,
    });
    res.status(201).json(nuevoApartamento);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al crear el apartamento.' });
  }
};

exports.actualizarApartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroDeApartamento, bloque, metros, estado, propietarioId } = req.body;

    const apartamento = await Apartamento.findByPk(id);
    if (!apartamento) {
      return res.status(404).json({ error: 'Apartamento no encontrado.' });
    }

    apartamento.numeroDeApartamento = numeroDeApartamento || apartamento.numeroDeApartamento;
    apartamento.bloque = bloque || apartamento.bloque;
    apartamento.metros = metros || apartamento.metros;
    apartamento.estado = estado || apartamento.estado;
    apartamento.propietarioId = propietarioId || apartamento.propietarioId;

    await apartamento.save();

    res.status(200).json(apartamento);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al actualizar el apartamento.' });
  }
};

exports.eliminarApartamento = async (req, res) => {
  try {
    const { id } = req.params;
    const apartamento = await Apartamento.findByPk(id);

    if (!apartamento) {
      return res.status(404).json({ error: 'Apartamento no encontrado.' });
    }

    await apartamento.destroy();
    res.status(200).json({ message: 'Apartamento eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al eliminar el apartamento.' });
  }
};