import pool from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RowDataPacket } from 'mysql2';

type PlaylistRow = RowDataPacket & {
    id: number;
    youtube_playlist_id: string;
    name: string;
};

type VideoRow = RowDataPacket & {
    id: number;
    playlist_id: number;
    video_id: string;
    title: string;
    thumbnail_url: string;
    position: number;
    learned: number | boolean;
    progress_id: number;
};

export const load: PageServerLoad = async ({ params }) => {
    const { playlistId } = params;

    const [playlists] = await pool.query<PlaylistRow[]>('SELECT * FROM playlists WHERE youtube_playlist_id = ?', [playlistId]);
    if (playlists.length === 0) {
        throw error(404, 'Playlist not found');
    }

    const playlist = playlists[0];

    const [videos] = await pool.query<VideoRow[]>(`
        SELECT v.*, p.learned, p.id as progress_id
        FROM videos v
        JOIN progress p ON v.id = p.video_id
        WHERE v.playlist_id = ?
        ORDER BY v.position ASC
    `, [playlist.id]);

    // Normalize learned to boolean
    const normalized = videos.map(v => ({
        ...v,
        learned: Boolean(v.learned)
    }));

    return {
        playlist,
        videos: normalized
    };
};
