import express from 'express';
import Model from '../model/Model.js';
import { verifyToken } from '../utils/verifyUser.js';
import { readUserItems, createItem, deleteItem } from '../controller/user.controller.js';

const router = express.Router();

router.get('/user/:id', readUserItems)
router.post('/postitem', verifyToken, createItem)
router.post('/deleteitem', verifyToken, deleteItem)

router.get('/:tipo', async (req, res, next) => {
    let tipo = req.params.tipo;
    let result = await Model.readItems(tipo);
    res.status(200).send(result);
})

export default router