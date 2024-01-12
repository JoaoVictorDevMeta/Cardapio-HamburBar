import Database from '../connection.js';

async function up () {
	const database = await Database.connect();

	var query = [
		`
		CREATE TABLE IF NOT EXISTS admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(50) NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL
    );`       
		,
		`
		CREATE TABLE IF NOT EXISTS item (
            id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            title VARCHAR(50) NOT NULL,
            description TEXT,
            image TEXT NOT NULL,
            imageDesc TEXT NOT NULL,
            price DOUBLE NOT NULL,
            tipo VARCHAR(50) NOT NULL,
            comprados INTEGER DEFAULT 0,
            PRIMARY KEY(id, user_id),
            FOREIGN KEY (user_id) REFERENCES admin(id)
          );
        `,
	];
	
	var promise;

	for (const element of query) {
		promise = await execQuery(database, element );
	}

	return promise;
}

async function execQuery (database, query ) {
	return await database.run( query );
}

export default { up };
