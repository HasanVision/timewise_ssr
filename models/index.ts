import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { DataTypes } from 'sequelize';
import{ User }from './User';
import { VerificationToken } from './pVerificationT';
import { IPInfo } from './ipInfo';
import { Token } from './tokens';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const basename = path.basename(__filename);
const db: any = {}; 


const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: process.env['DB_HOST'],
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  models: [User, VerificationToken, IPInfo, Token],  
  logging: false,
});


async function importModels() {
  const files = fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' &&
        file.indexOf('.test.ts') === -1
      );
    });

  for (const file of files) {
    const modelPath = path.join(__dirname, file);
    
 
    const { default: model } = await import(modelPath);

 
    const initializedModel = model(sequelize, DataTypes);


    db[initializedModel.name] = initializedModel;
  }


  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}


(async () => {
  await importModels();
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
