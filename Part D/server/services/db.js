import { createConnection } from 'mysql2/promise';
import config from '../config.js';

export default async function query(sql) {
  const connection = await createConnection(config.db);
  const [results, ] = await connection.execute(sql);
  return results;
}