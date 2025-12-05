import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Test the connection
import mysql from 'mysql2/promise';

const connectionConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "app_pass",
  database: process.env.DB_NAME || "reading_list",
  ssl: {
    rejectUnauthorized: false,
  },
};

console.log('Connection config:', connectionConfig);

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    const connection = await mysql.createConnection(connectionConfig);
    console.log('Connection successful!');
    await connection.end();
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();