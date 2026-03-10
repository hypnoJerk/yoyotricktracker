<script>
    let { data } = $props();
    const { stats, playlists } = data;
    const overallPercent = stats.total_videos > 0 ? (stats.total_learned / stats.total_videos) * 100 : 0;
</script>

<div class="public-page">
    <header class="hero">
        <div class="yoyo-sprite">🪀</div>
        <h1>YoYo Trick Tracker</h1>
        <p class="subtitle">Level up your yoyo game, one trick at a time.</p>
    </header>

    <section class="stats">
        <h2>Live Progress</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <span class="value">{stats.total_learned}</span>
                <span class="label">Tricks Learned</span>
            </div>
            <div class="stat-card">
                <span class="value">{stats.total_videos}</span>
                <span class="label">Tricks Tracked</span>
            </div>
            <div class="stat-card">
                <span class="value">{overallPercent.toFixed(0)}%</span>
                <span class="label">Completion</span>
            </div>
        </div>

        <div class="playlist-progress">
            <h3>Playlists</h3>
            {#each playlists as playlist}
                <div class="playlist-bar">
                    <div class="playlist-info">
                        <span>{playlist.name}</span>
                        <span>{playlist.learned_count} / {playlist.total_count}</span>
                    </div>
                    <div class="bar-bg">
                        <div class="bar-fill" style="width: {(playlist.learned_count / playlist.total_count) * 100}%"></div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <section class="gear">
        <h2>Retro Item Shop</h2>
        <div class="gear-grid">
            <div class="gear-item">
                <div class="icon">🪀</div>
                <h3>Magicyoyo K2</h3>
                <p>Perfect for beginners. Crystal clear and responsive.</p>
                <a href="#" class="buy-btn">Buy for $12.99</a>
            </div>
            <div class="gear-item">
                <div class="icon">✨</div>
                <h3>YoYoFactory Replay Pro</h3>
                <p>The champion's choice for unresponsive play.</p>
                <a href="#" class="buy-btn">Buy for $15.99</a>
            </div>
        </div>
    </section>

    <footer>
        <p>&copy; 2026 YoYo Trick Tracker | <a href="/login">Admin Login</a></p>
    </footer>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    :global(body) {
        background-color: #1a1a1a;
        color: #eee;
        font-family: 'Press Start 2P', cursive;
        line-height: 1.6;
    }

    .public-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    .hero {
        text-align: center;
        margin-bottom: 60px;
    }

    .yoyo-sprite {
        font-size: 80px;
        animation: bounce 2s infinite ease-in-out;
        display: inline-block;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }

    h1 {
        font-size: 2.5rem;
        color: #ffeb3b;
        margin: 20px 0;
        text-shadow: 4px 4px #e91e63;
    }

    .subtitle {
        font-size: 0.8rem;
        color: #ff4081;
    }

    h2, h3 {
        color: #00bcd4;
        text-transform: uppercase;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
    }

    .stat-card {
        background: #333;
        padding: 20px;
        border: 4px solid #00bcd4;
        text-align: center;
    }

    .stat-card .value {
        display: block;
        font-size: 1.5rem;
        color: #ffeb3b;
    }

    .stat-card .label {
        font-size: 0.6rem;
        color: #aaa;
    }

    .playlist-bar {
        margin-bottom: 20px;
    }

    .playlist-info {
        display: flex;
        justify-content: space-between;
        font-size: 0.7rem;
        margin-bottom: 5px;
    }

    .bar-bg {
        height: 12px;
        background: #444;
        border: 2px solid #eee;
    }

    .bar-fill {
        height: 100%;
        background: #4caf50;
    }

    .gear-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .gear-item {
        background: #333;
        padding: 20px;
        border: 4px solid #ff4081;
        text-align: center;
    }

    .gear-item h3 {
        font-size: 0.8rem;
        margin: 10px 0;
    }

    .gear-item p {
        font-size: 0.6rem;
        color: #ccc;
    }

    .buy-btn {
        display: inline-block;
        margin-top: 15px;
        padding: 10px;
        background: #ffeb3b;
        color: #333;
        text-decoration: none;
        font-size: 0.7rem;
        border: none;
        box-shadow: 4px 4px #e91e63;
    }

    .buy-btn:hover {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px #e91e63;
    }

    footer {
        margin-top: 60px;
        text-align: center;
        font-size: 0.6rem;
        color: #666;
    }

    footer a {
        color: #00bcd4;
        text-decoration: none;
    }
</style>
