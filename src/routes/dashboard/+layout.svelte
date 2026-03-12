<script lang="ts">
    import { onMount } from 'svelte';
    import { page, navigating } from '$app/stores';

    interface Playlist {
        id: number;
        youtube_playlist_id: string;
        name: string;
        learned_count: number;
        total_count: number;
    }

    let { data, children } = $props<{
        data: {
            user?: { id: number; username: string };
            playlists: Playlist[];
        };
        children: any;
    }>();

    let playlistUrl = $state('');
    let sidebarOpen = $state(false);
    let theme = $state<'light' | 'dark'>('light');

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

    // Close sidebar on navigation (for mobile)
    $effect(() => {
        if ($navigating) {
            sidebarOpen = false;
        }
    });
</script>

<div class="dashboard-layout" data-theme={theme}>
    <header class="mobile-header">
        <button class="menu-toggle" onclick={() => sidebarOpen = !sidebarOpen} aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div class="app-logo">YoYo Tracker</div>
        <button class="theme-btn" onclick={toggleTheme} aria-label="Toggle theme">
            {#if theme === 'dark'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            {/if}
        </button>
    </header>

    {#if sidebarOpen}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="overlay" onclick={() => sidebarOpen = false} role="button" aria-label="Close sidebar" tabindex="0"></div>
    {/if}

    <aside class="sidebar" class:open={sidebarOpen}>
        <div class="sidebar-header">
            <h2 class="app-logo">YoYo Tracker</h2>
            <button class="theme-btn desktop-only" onclick={toggleTheme} aria-label="Toggle theme">
                {#if theme === 'dark'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                {/if}
            </button>
        </div>

        <div class="section-label">ADD PLAYLIST</div>
        <div class="add-playlist">
            <input type="text" bind:value={playlistUrl} placeholder="YouTube URL..." />
            <button onclick={addPlaylist}>Add</button>
        </div>

        <div class="section-label">YOUR PLAYLISTS</div>
        <nav class="playlist-nav">
            <ul>
                {#each data.playlists as playlist}
                    {@const isActive = $page.params.playlistId === playlist.youtube_playlist_id}
                    <li>
                        <a href="/dashboard/{playlist.youtube_playlist_id}" class:active={isActive}>
                            <span class="playlist-name">{playlist.name}</span>
                            <span class="progress-badge">{playlist.learned_count}/{playlist.total_count}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>

        <div class="user-info">
            {#if data.user}
                <div class="user-details">
                    <span class="username">{data.user.username}</span>
                    <form action="/logout" method="POST">
                        <button type="submit" class="logout-btn">Logout</button>
                    </form>
                </div>
            {:else}
                <a href="/login" class="login-link">Log in</a>
            {/if}
        </div>
    </aside>

    <main class="content">
        {@render children()}
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    .dashboard-layout {
        --bg: #ffffff;
        --sidebar-bg: #f8fafc;
        --content-bg: #ffffff;
        --card-bg: #ffffff;
        --card-learned-bg: #f0fdf4;
        --text-color: #1e293b;
        --text-muted: #64748b;
        --border-color: #e2e8f0;
        --primary: #6366f1;
        --primary-hover: #4f46e5;
        --accent: #10b981;
        --progress-bg: #f1f5f9;
        --sidebar-active: #eef2ff;
        --sidebar-hover: #f1f5f9;

        display: flex;
        height: 100vh;
        background: var(--bg);
        color: var(--text-color);
        overflow: hidden;
    }

    .dashboard-layout[data-theme="dark"] {
        --bg: #0f172a;
        --sidebar-bg: #1e293b;
        --content-bg: #0f172a;
        --card-bg: #1e293b;
        --card-learned-bg: #064e3b;
        --text-color: #f1f5f9;
        --text-muted: #94a3b8;
        --border-color: #334155;
        --primary: #818cf8;
        --primary-hover: #a5b4fc;
        --accent: #34d399;
        --progress-bg: #334155;
        --sidebar-active: #312e81;
        --sidebar-hover: #334155;
    }

    .mobile-header {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: var(--sidebar-bg);
        border-bottom: 1px solid var(--border-color);
        padding: 0 16px;
        align-items: center;
        justify-content: space-between;
        z-index: 50;
    }

    .menu-toggle, .theme-btn {
        background: transparent;
        border: none;
        color: var(--text-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        border-radius: 8px;
        transition: background 0.2s;
    }

    .menu-toggle:hover, .theme-btn:hover {
        background: var(--sidebar-hover);
    }

    .app-logo {
        font-weight: 800;
        font-size: 1.25rem;
        letter-spacing: -0.025em;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .sidebar {
        width: 280px;
        background: var(--sidebar-bg);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        padding: 24px;
        flex-shrink: 0;
        transition: transform 0.3s ease;
        z-index: 100;
    }

    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32px;
    }

    .desktop-only {
        display: flex;
    }

    .section-label {
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--text-muted);
        letter-spacing: 0.05em;
        margin-bottom: 12px;
    }

    .add-playlist {
        display: flex;
        gap: 8px;
        margin-bottom: 32px;
    }

    .add-playlist input {
        flex: 1;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        background: var(--card-bg);
        color: var(--text-color);
        font-size: 0.9rem;
    }

    .add-playlist button {
        background: var(--primary);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }

    .add-playlist button:hover {
        background: var(--primary-hover);
    }

    .playlist-nav {
        flex: 1;
        overflow-y: auto;
    }

    .playlist-nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .playlist-nav li {
        margin-bottom: 4px;
    }

    .playlist-nav a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        text-decoration: none;
        color: var(--text-color);
        border-radius: 8px;
        transition: all 0.2s;
        font-weight: 500;
        font-size: 0.95rem;
    }

    .playlist-nav a:hover {
        background: var(--sidebar-hover);
    }

    .playlist-nav a.active {
        background: var(--sidebar-active);
        color: var(--primary);
    }

    .playlist-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 8px;
    }

    .progress-badge {
        font-size: 0.75rem;
        background: var(--border-color);
        padding: 2px 6px;
        border-radius: 12px;
        color: var(--text-muted);
        white-space: nowrap;
    }

    .active .progress-badge {
        background: var(--primary);
        color: white;
    }

    .user-info {
        margin-top: auto;
        padding-top: 24px;
        border-top: 1px solid var(--border-color);
    }

    .user-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .username {
        font-weight: 600;
        font-size: 0.9rem;
    }

    .logout-btn {
        background: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-muted);
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 0.8rem;
        cursor: pointer;
    }

    .logout-btn:hover {
        background: #fee2e2;
        color: #ef4444;
        border-color: #fecaca;
    }

    .content {
        flex: 1;
        padding: 40px;
        overflow-y: auto;
        background: var(--content-bg);
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 75;
    }

    @media (max-width: 768px) {
        .mobile-header {
            display: flex;
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            transform: translateX(-100%);
        }

        .sidebar.open {
            transform: translateX(0);
        }

        .desktop-only {
            display: none;
        }

        .content {
            padding: 80px 20px 20px 20px;
        }
    }
</style>
