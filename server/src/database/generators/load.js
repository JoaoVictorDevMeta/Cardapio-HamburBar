import Migration from './migration.js';
import Seed from './seeders.js';

async function load() {
  await Migration.up();
	console.log("\nMigration loaded with success!!\n");
  //await Seed.up();
	//console.log("Seeds add with success!!\n");
}

load();