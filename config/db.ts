import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize with connection details
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env['DB_HOST'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASS'],
  database: process.env['DB_NAME'],
  port: Number(process.env['DB_PORT']),
  models: [__dirname + '/models'], // Adjust this path to your models folder
  logging: false, // Disable logging for cleaner output
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Run the test
testConnection();

export default sequelize;

