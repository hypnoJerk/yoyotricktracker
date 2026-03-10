import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

const pool = mysql.createPool({
    host: env.DATABASE_HOST,
    port: parseInt(env.DATABASE_PORT || '3306'),
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
