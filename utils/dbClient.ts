
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function executeQuery(sql: string, params?: any[]) {
  // Create database connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
      ? Number(process.env.DB_PORT)
      : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    // Execute SQL query with optional parameters
    const [result] = await connection.execute(sql, params);

    // Return query result
    return result;
  } finally {
    // CHANGED: Always close connection, even if query fails
    await connection.end();
  }
}