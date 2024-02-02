import { errorHandler } from '../utils/error.js';
import Database from '../database/connection.js';
import Model from '../model/Model.js';

const priceFormat = new  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

export const readUserItems = async (req, res, next) => {   
    try{
        let result = await Model.readUserItems(req.params.id)
        res.status(200).send(result)
    }catch(error){
        next(error);
    }
}

export const createItem = async (req, res, next) => {
    const database = await Database.connect();

    try{
        const price = priceFormat.format(parseFloat(req.body.price));
        const id = await database.get('SELECT MAX(id) + 1 as id FROM item')
        

        const updateuser = await Model.insertItem( 'item', [ 
            id.id || 1, //id
            req.user.id, //user id
            req.body.productName, //title
            req.body.description || '', //description
            req.body.profilePicture || '', //image
            req.body.imageUrl || 'Imagem Ilustrativa', //imageDesc
            price, // price
            req.body.category, // tipo
            0, //comprados
        ]);

        res.status(200).send('Item adicionado com sucesso!');
    } catch(err) {
        console.log(err);
        next(err);
    }
}

export const deleteItem = async (req, res, next) => {
    try{
        const result = await Model.deleteItem(req.body.id)
        res.status(200).send("deleted")
    } catch(err) {
        console.log(err)
        next(err);
    }
}

export const editItem = async (req, res, next) => {
    try{
        const database = await Database.connect();
        const price = priceFormat.format(parseFloat(req.body.price));

        let oldItem = await Model.readItem(req.body.id);

        const result = Model.updateItem(req.body.id, [ 
            req.body.productName || oldItem.title, //title
            req.body.description || oldItem.description, //description
            req.body.profilePicture || oldItem.image, //image
            req.body.imageUrl || 'Imagem Ilustrativa', //imageDesc
            price || oldItem.price, // price
            req.body.category || oldItem.category, // tipo
        ])

        res.status(200).send("edited")
    } catch(err) {
        console.log(err)
        next(err);
    }
}