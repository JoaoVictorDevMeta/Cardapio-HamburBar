import { resolve } from 'path';
import { Database } from 'sqlite-async';

const dbFilePath = resolve('server','src','database', 'database.sqlite');

async function connect() {
  return await Database.open(dbFilePath);
}
 
export default { connect };
