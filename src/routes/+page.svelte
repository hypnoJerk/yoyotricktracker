<script lang="ts">
    export let data;
    const { stats, playlists = [] } = data;
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
            {#each playlists as playlist (playlist.id)}
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
        <h2>Item Shop</h2>
        <div class="gear-grid">
            <div class="gear-item">
                <div class="icon">🪀</div>
                <h3>Magicyoyo K2</h3>
                <p>With the MAGICYOYO K2 Crystal, you’re not just buying a yo-yo—you’re embarking on a journey.</p>
                <a href="https://www.amazon.com/MAGICYOYO-Professional-Replacement-Unresponsive-Intermediate/dp/B0C5DQPHJ4/ref=sr_1_1_sspa?crid=2N9XCXYWU7BIA&dib=eyJ2IjoiMSJ9.7iBz8hMYO8nupArBAwbV5I5j9QFVVp6X0dqOPG9L3BGF7aD-3EhTw2-nFELHEHOScf3C5-_Ye-e12WGEay3RyPfnrYgyZgqs1vUwzim4z26FUXCxZ0RZrvKeH-TKeKTASuWkSI_p1huZFqeJQFl26D1RRf9LsNXJxfS19vy47YfejpBYzlKu8il0m07eXDo4rm9gNX0J2lsFZ_uKpYt-jk1pp6VvQmLfN2NSUOC7j_SX-cdYkML6C0Cvkd3OAbWeDnsekQpjD32EK8RllzIzucLhkvBUM8gS_5Z6IUsBaGA.znogBi4bGtTa8SoU_5lUD0Iqk-lK148dC9VeBCQSl9o&dib_tag=se&keywords=k2%2Bkrystal%2Byoyo&qid=1773263688&sprefix=krystal%2Bk2%2Caps%2C190&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1" target="_blank" class="buy-btn">Buy for ~$15.99</a>
            </div>
            <div class="gear-item">
                <div class="icon">✨</div>
                <h3>YoYoFactory Replay Pro</h3>
                <p>The champion's choice for unresponsive play.</p>
                <a href="https://www.amazon.com/MAGICYOYO-V12-Professional-Responsive-Unresponsive/dp/B0D66VHBKV/ref=sr_1_8?dib=eyJ2IjoiMSJ9.Vf6XwqahHD1zt_bMVWgDS_KI9ZXEDMVxmgmhNaUrS-WnSel8OIXevbeM5_-Lh0zLiG9Wb0xB983v7jUGOaGbxzh34xKGEhQJH2-3cy3lhKWHbPz_MLvYzKiu3kKwbYqHOQ5ckH_-eFI2ZYzbRwSEocHTJbGeC483JAvWltaun_Q25u244Adwi_x32It5ob7IGIeCg7jJx4T0L2tupI-ONiFNhWyIGRQN80PyTwpTZi529_DQ6zL08OCcgEJDlAnjDdddzcp22_MGFRNIUuUHweNF0nChaWpH2zYM07tiDh4.pnEoWZKw91PRxum6LyRJdl_-7O8Vn59KCrSa31A4BT4&dib_tag=se&keywords=magicyoyo%2Bunresponsive&qid=1773350227&sr=8-8&th=1" target="_blank" class="buy-btn">Buy for ~$22.55</a>
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
