import { json } from '@sveltejs/kit';
import pool from '$lib/db';
import { fetchPlaylistMetadata, fetchPlaylistVideos } from '$lib/youtube';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    if (!locals.user) {
        return json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { url } = await request.json();
    if (!url) return json({ message: 'URL is required' }, { status: 400 });

    // Extract playlist ID
    const urlParams = new URLSearchParams(new URL(url).search);
    const playlistId = urlParams.get('list');

    if (!playlistId) return json({ message: 'Invalid YouTube playlist URL' }, { status: 400 });

    try {
        // Check if playlist already exists
        const [existing] = await pool.query('SELECT id FROM playlists WHERE youtube_playlist_id = ?', [playlistId]);
        if (existing.length > 0) {
            return json({ message: 'Playlist already added' }, { status: 400 });
        }

        const metadata = await fetchPlaylistMetadata(playlistId);
        const videos = await fetchPlaylistVideos(playlistId);

        // Insert playlist
        const [result] = await pool.query(
            'INSERT INTO playlists (youtube_playlist_id, name) VALUES (?, ?)',
            [playlistId, metadata.title]
        );
        const internalPlaylistId = result.insertId;

        // Insert videos and progress
        for (const video of videos) {
            const [videoResult] = await pool.query(
                'INSERT INTO videos (playlist_id, video_id, title, thumbnail_url, position) VALUES (?, ?, ?, ?, ?)',
                [internalPlaylistId, video.videoId, video.title, video.thumbnailUrl, video.position]
            );
            const internalVideoId = videoResult.insertId;

            await pool.query(
                'INSERT INTO progress (video_id, learned) VALUES (?, ?)',
                [internalVideoId, false]
            );
        }

        return json({ success: true });
    } catch (err) {
        console.error('Error adding playlist:', err);
        return json({ message: err.message }, { status: 500 });
    }
}
