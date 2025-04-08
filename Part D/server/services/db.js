import mysql from 'mysql2/promise';
import config from '../config.js';

const pool = mysql.createPool({
  ...config.db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default async function query(sql) {
  const [results] = await pool.execute(sql);
  return results;
}