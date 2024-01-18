import express from 'express';
import Model from '../model/Model.js';

const router = express.Router();

router.get('/:tipo', async (req, res, next) => {
    let tipo = req.params.tipo;
    let result = await Model.readItems(tipo);
    res.send(result);
})

export default router