import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { DataTypes } from 'sequelize';
import{ User }from './User';
import { VerificationToken } from './pVerificationT';

// Create __filename and __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const basename = path.basename(__filename);
const db: any = {}; // Use `any` for the `db` object to simplify typing

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',  // or your database type
  host: process.env['DB_HOST'],
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_DATABASE'],
  models: [User, VerificationToken],  
  logging: false,
});

// Use async/await to handle dynamic imports of models
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
    
    // Dynamically import the model file
    const { default: model } = await import(modelPath);

    // Initialize the model with the sequelize instance
    const initializedModel = model(sequelize, DataTypes);

    // Store the model in the db object
    db[initializedModel.name] = initializedModel;
  }

  // Set up model associations (if any)
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

// Call the function inside an async function
(async () => {
  await importModels();
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
