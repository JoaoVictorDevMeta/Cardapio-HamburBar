import { errorHandler } from '../utils/error.js';
import Database from '../database/connection.js';
import Model from '../model/Model.js';

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
    
    if (req.user.id != req.params.id) {
        return next(errorHandler(401, 'This not your account!'));
    }
    

    try{
        const price = parseFloat(req.body.price.replace(',', '.')).toFixed(2);
        const id = await database.get('SELECT MAX(id) + 1 as id FROM item')
        const updateuser = await Model.insertItem( 'item', [ 
            id.id, //id
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