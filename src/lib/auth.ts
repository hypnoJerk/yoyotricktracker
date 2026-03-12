import bcrypt from 'bcryptjs';
import pool from './db';
import type { RowDataPacket } from 'mysql2';

export interface User {
    id: number;
    username: string;
}

export async function authenticate(username: string, password: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return null;

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return null;

    return { id: user.id, username: user.username };
}
