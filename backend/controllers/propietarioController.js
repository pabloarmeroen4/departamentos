const { Propietario } = require('../models');

const crearPropietario = async (req, res) => {
  try {
    const propietario = await Propietario.create(req.body);
    res.status(201).json(propietario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerPropietarios = async (req, res) => {
  try {
    const propietarios = await Propietario.findAll();
    res.status(200).json(propietarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearPropietario,
  obtenerPropietarios,
};