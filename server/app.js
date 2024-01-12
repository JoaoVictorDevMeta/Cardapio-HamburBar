import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Model from './src/model/model.js';
const app = express();

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Bem vindo e Bem vinda à minha API de itens, Cardapio HamburBar!')
})

app.get("/items/:tipo", async (req, res, next) => {
    let tipo = req.params.tipo
    let result = await Model.readItems(tipo);
    res.send(result);
})

app.use((req, res) => {
    res.status(404);
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});