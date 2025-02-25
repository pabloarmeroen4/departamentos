const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const informesRoutes = require('./routes/informesRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const propietariosRoutes = require('./routes/propietarioRoutes');
const userRoutes = require('./routes/userRoutes');
const visitantesRoutes = require('./routes/visitantesRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/api', informesRoutes);
app.use('/api', pagoRoutes);
app.use('/api', propietariosRoutes);
app.use('/api', userRoutes);
app.use('/api', visitantesRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});