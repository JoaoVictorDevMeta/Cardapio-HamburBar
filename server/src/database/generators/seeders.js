import { resolve } from 'path';
import { readFileSync } from 'fs';
import Model from '../../models/Model.js';

async function up () {
	const file = resolve( 'src', 'database', 'generators', 'jsons', 'data.json' );

	const data = JSON.parse( readFileSync( file ) );

	var index = 0
	var tables = ['users']
	
	for (const key in data) {
		if (Object.hasOwnProperty.call(data, key)) {
			const array = data[key];
			for (const element of array) {
				if(array.length != 0){
					await Model.createItem(tables[index], element);
				}
			}
		}
		index++
	}
}

export default { up };