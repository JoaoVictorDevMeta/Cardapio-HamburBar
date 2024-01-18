import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import cookieParser from 'cookie-parser';

import itemRoute from './src/routes/items.route.js';
import authRoute from './src/routes/auth.route.js';

import "dotenv/config.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


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

