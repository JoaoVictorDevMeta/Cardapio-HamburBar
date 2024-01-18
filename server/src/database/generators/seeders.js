import { resolve } from 'path';
import { readFileSync } from 'fs';
import Model from '../../model/Model.js';

async function up () {
	const file = resolve( 'src', 'database', 'generators', 'jsons', 'data.json' );

	const data = JSON.parse( readFileSync( file ) );

	var index = 0
	var tables = ['admin']
	
	for (const key in data) {
		if (Object.hasOwnProperty.call(data, key)) {
			const array = data[key];
			for (const element of array) {
				if(array.length != 0){
					let result = await Model.insertItem(tables[index], element);
					console.log("added",tables[index],"=>", element)
				}
			}
		}
		index++
	}
}

export default { up };