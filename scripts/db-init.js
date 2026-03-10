import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const schema = [
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS playlists (
      id INT AUTO_INCREMENT PRIMARY KEY,
      youtube_playlist_id VARCHAR(100) NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS videos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      playlist_id INT NOT NULL,
      video_id VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      thumbnail_url VARCHAR(500),
      position INT NOT NULL,
      FOREIGN KEY (playlist_id) REFERENCES playlists(id)
    );`,
    `CREATE TABLE IF NOT EXISTS progress (
      id INT AUTO_INCREMENT PRIMARY KEY,
      video_id INT NOT NULL UNIQUE,
      learned BOOLEAN DEFAULT FALSE,
      learned_at TIMESTAMP,
      FOREIGN KEY (video_id) REFERENCES videos(id)
    );`
];

async function init() {
    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '3306'),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        multipleStatements: true
    });

    console.log('Connected to database.');

    for (const sql of schema) {
        await connection.query(sql);
        console.log('Executed:', sql.split('\n')[0]);
    }

    console.log('Database initialization complete.');
    await connection.end();
}

init().catch(err => {
    console.error('Database initialization failed:', err);
    process.exit(1);
});
