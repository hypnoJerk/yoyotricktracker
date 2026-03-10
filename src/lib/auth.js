import bcrypt from 'bcryptjs';
import pool from './db';

/**
 * @param {string} username
 * @param {string} password
 */
export async function authenticate(username, password) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return null;

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return null;

    return { id: user.id, username: user.username };
}
