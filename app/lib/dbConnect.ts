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
    // 1. Force correct line breaks in the certificate
    ca: process.env.DATABASE_CERT 
        ? process.env.DATABASE_CERT.replace(/\\n/g, '\n') 
        : undefined,
    rejectUnauthorized: true 
  }
});



export default db;