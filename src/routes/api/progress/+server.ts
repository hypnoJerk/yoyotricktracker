import { json } from '@sveltejs/kit';
import pool from '$lib/db';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    if (!locals.user) {
        return json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { videoId, learned } = await request.json();
    if (videoId === undefined || learned === undefined) {
        return json({ message: 'Invalid data' }, { status: 400 });
    }

    try {
        await pool.query(
            'UPDATE progress SET learned = ?, learned_at = ? WHERE video_id = ?',
            [learned, learned ? new Date() : null, videoId]
        );
        return json({ success: true });
    } catch (err) {
        console.error('Error updating progress:', err);
        const message = err instanceof Error ? err.message : String(err);
        return json({ message }, { status: 500 });
    }
}
