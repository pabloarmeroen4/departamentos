const { Usuario } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nombre, cedula, telefono, usuarioId, contraseña, rol } = req.body;
    const nuevoUsuario = await Usuario.create({ nombre, cedula, telefono, usuarioId, contraseña, rol });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cedula, telefono, usuarioId, contraseña, rol } = req.body;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.update({ nombre, cedula, telefono, usuarioId, contraseña, rol });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.destroy();
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInformesPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const informes = await Informe.findAll({
      where: { emisorId:usuarioId },
      include: {
        model: Usuario,
        as: 'emisor',
        attributes: ['nombre'],
      },
    });
    if (!informes.length) {
      return res.status(404).json({ error: 'No se encontraron informes para este usuario.' });
    }
    const informesConNombres = informes.map((informe) => ({
      ...informe.toJSON(),
      remitenteName: informe.remitente?.nombre || null,
    }));
    return res.status(200).json(informesConNombres);
  } catch (error) {
    return res.status(500).json({
      error: 'Hubo un error al obtener los informes.',
      detalles: error.message,
    });
  }
};
