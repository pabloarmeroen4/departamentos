import express from 'express';
import propietarioRoutes from './routes/propietarioRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/propietarios', propietarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});