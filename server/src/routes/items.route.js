import express from 'express';
import Model from '../model/Model.js';
import { verifyToken } from '../utils/verifyUser.js';
import { readUserItems, createItem, deleteItem, editItem } from '../controller/user.controller.js';

const router = express.Router();

router.get('/user/:id', readUserItems)
router.post('/postitem', verifyToken, createItem)
router.post('/deleteitem', verifyToken, deleteItem)
router.post('/edititem', verifyToken, editItem)

router.get('/item/:id', async (req, res, next) =>{
    let id = req.params.id;
    let result = await Model.readItem(id);
    res.status(200).send(result);
})
router.get('/:tipo', async (req, res, next) => {
    let tipo = req.params.tipo;
    let result = await Model.readItems(tipo);
    res.status(200).send(result);
})

export default router