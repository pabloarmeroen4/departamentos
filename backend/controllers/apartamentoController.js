const { Apartamento } = require('../models');

const crearApartamento = async (req, res) => {
  try {
    const apartamento = await Apartamento.create(req.body);
    res.status(201).json(apartamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerApartamentos = async (req, res) => {
  try {
    const apartamentos = await Apartamento.findAll();
    res.status(200).json(apartamentos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearApartamento,
  obtenerApartamentos,
};