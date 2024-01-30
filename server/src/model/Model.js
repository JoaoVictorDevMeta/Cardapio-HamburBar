import Database from '../database/connection.js';

// this is from another repository
class DatabaseManagementSystem {
	async readItems(tipo){
        const database = await Database.connect();
        let query = `SELECT * FROM item WHERE tipo = ?`;
        const result = await database.all(query, tipo);
        return result
    }

    async readUserItems(id){
        const database = await Database.connect();
        let query = `SELECT * FROM item WHERE user_id = ?`;
        const result = await database.all(query, id);
        return result
    }

    async insertItem(table, row){ // peguei de outro projeto que fiz
        const database = await Database.connect();
		var dataTable = {};
		dataTable.values = [];
		switch ( table ) {
			case 'admin':
				dataTable.camps = 'name, email, password';
				break;
            case 'item':
                dataTable.camps = 'id, user_id, title, description, image, imageDesc, price, tipo, comprados';
                break;
			default:
				return 0;
		}
		dataTable.reserved = '';
		for ( const key in row ) {
			if ( Object.hasOwnProperty.call( row, key ) ) {
				dataTable.reserved += ', ?';
				dataTable.values.push( row[ key ] );
			}
		}
		var query = `INSERT INTO ${ table } (${ dataTable.camps }) VALUES (${ dataTable.reserved.slice( 2 ) })`;
		const result = await database.run( query, dataTable.values );
		return result
    }

    async readAdmin(nome){
        const database = await Database.connect();
        let query = `SELECT * FROM admin WHERE email = ?`;
        const result = await database.get(query, nome);
        return result
    }

    async createAdmin(nome, email, password){
        const database = await Database.connect();
        let query = ` INSERT INTO admin (email, password, name) VALUES (?, ?, ?)`;
        const result = await database.run(query, [email, password, nome]);
        return "added user" + result;
    }

    async deleteItem(id){
        const database = await Database.connect();
        let query = ` DELETE FROM item WHERE id = ?`;
        const result = await database.run(query, id)
        return 'deleted item' + result;
    }
}

const Model = new DatabaseManagementSystem();

export default Model