import pool from '$lib/db';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { playlistId } = params;

    const [playlists] = await pool.query('SELECT * FROM playlists WHERE youtube_playlist_id = ?', [playlistId]);
    if (playlists.length === 0) {
        throw error(404, 'Playlist not found');
    }

    const playlist = playlists[0];

    const [videos] = await pool.query(`
        SELECT v.*, p.learned, p.id as progress_id
        FROM videos v
        JOIN progress p ON v.id = p.video_id
        WHERE v.playlist_id = ?
        ORDER BY v.position ASC
    `, [playlist.id]);

    return {
        playlist,
        videos
    };
}
