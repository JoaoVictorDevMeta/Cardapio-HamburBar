import Database from '../database/connection.js';

// this is from another repository
class DatabaseManagementSystem {
	async readItems(tipo){
        const database = await Database.connect();
        let query = `SELECT * FROM item WHERE tipo = ?`;
        const result = await database.all(query, tipo)
        return result
    }
}

const Model = new DatabaseManagementSystem();

export default Model