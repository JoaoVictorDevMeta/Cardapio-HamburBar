import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import itemRoute from './src/routes/items.route.js';
import authRoute from './src/routes/auth.route.js';
dotenv.config();

const PORT = 5000;

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.get('/api', (req, res) => {
  res.send('Bem vindo e Bem vinda à minha API de itens, Cardapio HamburBar!')
})

app.use('/api/auth', authRoute);
app.use('/api/items', itemRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
