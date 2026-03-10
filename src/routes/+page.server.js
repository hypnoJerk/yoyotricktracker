import pool from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const [stats] = await pool.query(`
        SELECT 
            (SELECT COUNT(*) FROM progress WHERE learned = TRUE) as total_learned,
            (SELECT COUNT(*) FROM videos) as total_videos
    `);

    const [playlists] = await pool.query(`
        SELECT p.*, 
        (SELECT COUNT(*) FROM progress pr JOIN videos v ON pr.video_id = v.id WHERE v.playlist_id = p.id AND pr.learned = TRUE) as learned_count,
        (SELECT COUNT(*) FROM videos v WHERE v.playlist_id = p.id) as total_count
        FROM playlists p
    `);

    return {
        stats: stats[0],
        playlists
    };
}
