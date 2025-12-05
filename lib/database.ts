import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectionConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "app_pass",
  database: process.env.DB_NAME || "reading_list",
  ssl: {
    // for local testing you *can* do:
    // rejectUnauthorized: false
    rejectUnauthorized: false,
  },
};

let connection: mysql.Connection | null = null;

export async function getDbConnection(): Promise<mysql.Connection> {
  if (!connection) {
    connection = await mysql.createConnection(connectionConfig);
  }
  return connection;
}

// Helper function to execute queries
export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  const conn = await getDbConnection();
  const [rows] = await conn.execute(query, params);
  return rows as T[];
}

// Helper function to execute single row queries
export async function executeQuerySingle<T = any>(
  query: string,
  params: any[] = []
): Promise<T | null> {
  const results = await executeQuery<T>(query, params);
  return results.length > 0 ? results[0] : null;
}
