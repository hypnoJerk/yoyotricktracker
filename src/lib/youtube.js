import { env } from '$env/dynamic/private';

/**
 * @param {string} playlistId
 */
export async function fetchPlaylistVideos(playlistId) {
    const apiKey = env.YOUTUBE_API_KEY;
    if (!apiKey) throw new Error('YOUTUBE_API_KEY is not set');

    let videos = [];
    let nextPageToken = '';

    do {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
            throw new Error(`YouTube API Error: ${data.error.message}`);
        }

        videos = videos.concat(data.items.map(item => ({
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
            position: item.snippet.position
        })));

        nextPageToken = data.nextPageToken || '';
    } while (nextPageToken);

    return videos;
}

/**
 * @param {string} playlistId
 */
export async function fetchPlaylistMetadata(playlistId) {
    const apiKey = env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
        throw new Error(`YouTube API Error: ${data.error.message}`);
    }

    if (!data.items || data.items.length === 0) {
        throw new Error('Playlist not found');
    }

    return {
        title: data.items[0].snippet.title
    };
}
