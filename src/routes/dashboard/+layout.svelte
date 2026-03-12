<script lang="ts">
    import { onMount } from 'svelte';

    export let data: {
        user?: { id: number; username: string };
        playlists: Array<{
            id: number;
            youtube_playlist_id: string;
            name: string;
            learned_count: number;
            total_count: number;
        }>;
    };

    let playlistUrl = '';

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

    // Theme handling (light/dark)
    let theme: 'light' | 'dark' = 'light';

    onMount(() => {
        try {
            const stored = localStorage.getItem('yoyoTheme');
            if (stored === 'light' || stored === 'dark') {
                theme = stored;
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = 'dark';
            }
        } catch (e) {
            // ignore
        }
    });

    function toggleTheme() {
        theme = theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('yoyoTheme', theme); } catch (e) {}
    }
</script>

<div class="dashboard-layout" data-theme={theme}>
    <aside class="sidebar">
        <h2>Playlists</h2>
        <div class="theme-toggle">
            <button on:click={toggleTheme} aria-label="Toggle dark mode">{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
        </div>
        <div class="add-playlist">
            <input type="text" bind:value={playlistUrl} placeholder="YouTube Playlist URL" />
            <button on:click={addPlaylist}>Add Playlist</button>
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
            {#if data.user}
                Logged in as {data.user.username}
                <form action="/logout" method="POST">
                    <button type="submit">Logout</button>
                </form>
            {:else}
                <a href="/login">Log in</a>
            {/if}
        </div>
    </aside>
    <main class="content">
        <slot />
    </main>
</div>

<style>
    /* Theme variables applied at layout root so child components inherit */
    .dashboard-layout {
        --bg: #ffffff;
        --sidebar-bg: #f4f4f4;
        --content-bg: #ffffff;
        --card-bg: #ffffff;
        --card-learned-bg: #e8f5e9;
        --text-color: #222;
        --muted: #666;
        --border-color: #ddd;
        --accent: #4caf50;
        --progress-bg: #eee;

        display: flex;
        height: 100vh;
        background: var(--bg);
        color: var(--text-color);
    }

    .dashboard-layout[data-theme="dark"] {
        --bg: #0f1720;
        --sidebar-bg: rgb(39, 43, 47);
        --content-bg: #1a1a1a;
        --card-bg: #333;
        --card-learned-bg: #103226;
        --text-color: #e6eef6;
        --muted: #9aa6b2;
        --border-color: #1f2a33;
        --accent: #64d37a;
        --progress-bg: #15202b;
    }

    .sidebar {
        width: 300px;
        background: var(--sidebar-bg);
        padding: 20px;
        border-right: 1px solid var(--border-color);
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
        background: var(--card-bg);
        color: var(--text-color);
        border: 1px solid var(--border-color);
    }
    .add-playlist button {
        background: var(--accent);
        color: white;
        border: none;
        padding: 8px 10px;
        border-radius: 4px;
        cursor: pointer;
    }
    .theme-toggle {
        margin: 10px 0;
    }
    .theme-toggle button {
        background: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-color);
        padding: 6px 8px;
        border-radius: 6px;
        cursor: pointer;
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
        color: var(--text-color);
        display: block;
        padding: 8px;
        border-radius: 4px;
    }
    .sidebar nav a:hover {
        background: var(--border-color);
    }
    .progress {
        font-size: 0.8em;
        color: var(--muted);
        float: right;
    }
    .content {
        flex-grow: 1;
        padding: 40px;
        overflow-y: auto;
        background: var(--content-bg);
    }
    .user-info {
        margin-top: auto;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);
    }
</style>
