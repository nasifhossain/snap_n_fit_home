import mysql from 'mysql2/promise';

const connectionConfig = {
  host: 'localhost',
  port: 3306,
  user: 'appuser',
  password: 'app_pass',
  database: 'reading_list',
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