const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, cedula, phone, username, password, role } = req.body;
    const newUser = await User.create({ name, cedula, phone, username, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cedula, phone, username, password, role } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    await user.update({ name, cedula, phone, username, password, role });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    await user.destroy();
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInformesPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const informes = await Informe.findAll({
      where: { usuarioId },
      include: {
        model: User,
        as: 'remitente',
        attributes: ['name'],
      },
    });

    if (!informes.length) {
      return res.status(404).json({ error: "No se encontraron informes para este usuario." });
    }

    const informesConNombres = informes.map((informe) => ({
      ...informe.toJSON(),
      remitenteName: informe.remitente?.name || null,
    }));

    return res.status(200).json(informesConNombres);
  } catch (error) {
    console.error("Error al obtener los informes:", error);
    return res.status(500).json({
      error: "Hubo un error al obtener los informes.",
      detalles: error.message,
    });
  }
};