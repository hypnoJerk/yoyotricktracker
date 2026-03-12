import pool from '$lib/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
    const [playlists] = await pool.query(`
        SELECT p.*, 
        (SELECT COUNT(*) FROM progress pr JOIN videos v ON pr.video_id = v.id WHERE v.playlist_id = p.id AND pr.learned = TRUE) as learned_count,
        (SELECT COUNT(*) FROM videos v WHERE v.playlist_id = p.id) as total_count
        FROM playlists p
    `);

    return {
        user: locals.user,
        playlists: playlists
    };
}
