//import { errorHandler } from '../utils/error.js';
import Model from '../model/Model.js';

export const readUserItems = async (req, res, next) => {   
    try{
        let result = await Model.readUserItems(req.params.id)
        res.status(200).send(result)
    }catch(error){
        next(error);
    }
}