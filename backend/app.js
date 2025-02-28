const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const informesRoutes = require('./routes/informesRoutes');
const pagoRoutes = require('./routes/pagoRoutes');
const propietariosRoutes = require('./routes/propietarioRoutes');
const userRoutes = require('./routes/userRoutes');
const visitantesRoutes = require('./routes/visitantesRoutes');
const apartamentoRoutes = require('./routes/apartamentoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', informesRoutes);
app.use('/api', pagoRoutes);
app.use('/api', propietariosRoutes);
app.use('/api', userRoutes);
app.use('/api', visitantesRoutes);
app.use('/api', apartamentoRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada correctamente');

    await sequelize.sync();
    console.log('Base de datos sincronizada');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();