import 'dotenv/config';
import './database/conDb.js';
import express from 'express';
import authRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRouter);

// solo para el ejmplo de prueba de login y token
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("http://localhost:" + PORT));