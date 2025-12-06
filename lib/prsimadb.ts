import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});
const prisma = new PrismaClient({ adapter });

// Test the database connection
async function testConnection() {
  try {
    console.log("Testing database connection...");
    console.log("Database config:", {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    
    await prisma.$connect();
    console.log("✅ Successfully connected to the database!");
    
    // Test a simple query
    const result = await prisma.user.count();
    console.log(`User count: ${result}`);
    
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Database connection closed.");
  }
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection();
}

export { prisma }