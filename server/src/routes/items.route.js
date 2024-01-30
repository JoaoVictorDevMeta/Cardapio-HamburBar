import express from 'express';
import Model from '../model/Model.js';
import { verifyToken } from '../utils/verifyUser.js';
import { readUserItems, createItem } from '../controller/user.controller.js';

const router = express.Router();

router.get('/user/:id', readUserItems)
router.post('/postitem/:id', verifyToken, createItem)

router.get('/:tipo', async (req, res, next) => {
    let tipo = req.params.tipo;
    let result = await Model.readItems(tipo);
    res.status(200).send(result);
})

export default router