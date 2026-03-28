import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import alumnosRouter from './routes/alumnos';
import materiasRouter from './routes/materias';
import inscripcionesRouter from './routes/inscripciones';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/alumnos', alumnosRouter);
app.use('/api/materias', materiasRouter);
app.use('/api/inscripciones', inscripcionesRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
