<script>
    let { data, children } = $props();
    let playlistUrl = $state('');

    async function addPlaylist() {
        if (!playlistUrl) return;

        const res = await fetch('/api/playlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: playlistUrl })
        });

        if (res.ok) {
            playlistUrl = '';
            location.reload(); // Simple way to refresh sidebar
        } else {
            const err = await res.json();
            alert(err.message || 'Error adding playlist');
        }
    }
</script>

<div class="dashboard-layout">
    <aside class="sidebar">
        <h2>Playlists</h2>
        <div class="add-playlist">
            <input type="text" bind:value={playlistUrl} placeholder="YouTube Playlist URL" />
            <button onclick={addPlaylist}>Add Playlist</button>
        </div>
        <nav>
            <ul>
                {#each data.playlists as playlist}
                    <li>
                        <a href="/dashboard/{playlist.youtube_playlist_id}">
                            {playlist.name}
                            <span class="progress">{playlist.learned_count} / {playlist.total_count}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
        <div class="user-info">
            Logged in as {data.user.username}
            <form action="/logout" method="POST">
                <button type="submit">Logout</button>
            </form>
        </div>
    </aside>
    <main class="content">
        {@render children()}
    </main>
</div>

<style>
    .dashboard-layout {
        display: flex;
        height: 100vh;
    }
    .sidebar {
        width: 300px;
        background: #f4f4f4;
        padding: 20px;
        border-right: 1px solid #ddd;
        display: flex;
        flex-direction: column;
    }
    .add-playlist {
        margin-bottom: 20px;
    }
    .add-playlist input {
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
    }
    .sidebar nav ul {
        list-style: none;
        padding: 0;
        flex-grow: 1;
    }
    .sidebar nav li {
        margin-bottom: 10px;
    }
    .sidebar nav a {
        text-decoration: none;
        color: #333;
        display: block;
        padding: 8px;
        border-radius: 4px;
    }
    .sidebar nav a:hover {
        background: #ddd;
    }
    .progress {
        font-size: 0.8em;
        color: #666;
        float: right;
    }
    .content {
        flex-grow: 1;
        padding: 40px;
        overflow-y: auto;
    }
    .user-info {
        margin-top: auto;
        padding-top: 20px;
        border-top: 1px solid #ddd;
    }
</style>
