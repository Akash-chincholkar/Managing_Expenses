import mysql from "mysql2/promise"
import fs from 'fs';
import path from 'path';

 const db = mysql.createPool({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    ca: fs.readFileSync(path.join(process.cwd(), 'certs/ca.pem')),
  }
});

export default db;