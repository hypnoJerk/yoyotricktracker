import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
    console.error('Usage: node scripts/create-user.js <username> <password>');
    process.exit(1);
}

async function createUser() {
    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '3306'),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    const hash = await bcrypt.hash(password, 10);

    try {
        await connection.query(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, hash]
        );
        console.log(`User ${username} created successfully.`);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            console.error(`Error: User ${username} already exists.`);
        } else {
            console.error('Error creating user:', err);
        }
    } finally {
        await connection.end();
    }
}

createUser();
