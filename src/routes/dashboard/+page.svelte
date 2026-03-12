<script lang="ts">
    import { fade } from 'svelte/transition';
</script>

<div class="welcome-container" in:fade>
    <div class="welcome-card">
        <div class="icon-header">
            <div class="yoyo-icon">🪀</div>
        </div>
        <h1>Welcome to YoYo Tracker</h1>
        <p class="subtitle">Your personal dashboard for mastering yoyo tricks.</p>

        <div class="getting-started">
            <h2>Get Started in 3 Steps:</h2>
            <div class="steps-grid">
                <div class="step">
                    <div class="step-num">1</div>
                    <h3>Find a Playlist</h3>
                    <p>Go to YouTube and find a playlist of yoyo tricks you want to learn.</p>
                </div>
                <div class="step">
                    <div class="step-num">2</div>
                    <h3>Add the URL</h3>
                    <p>Copy the playlist URL and paste it into the sidebar on the left.</p>
                </div>
                <div class="step">
                    <div class="step-num">3</div>
                    <h3>Track Progress</h3>
                    <p>Select your playlist and start checking off tricks as you master them!</p>
                </div>
            </div>
        </div>

        <div class="empty-state-hint">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Select a playlist from the sidebar to begin</span>
        </div>
    </div>
</div>

<style>
    .welcome-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 20px;
    }

    .welcome-card {
        max-width: 800px;
        width: 100%;
        background: var(--card-bg);
        padding: 60px 40px;
        border-radius: 24px;
        border: 1px solid var(--border-color);
        text-align: center;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
    }

    .icon-header {
        margin-bottom: 24px;
    }

    .yoyo-icon {
        font-size: 4rem;
        display: inline-block;
        animation: spin 4s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    h1 {
        font-size: 3rem;
        font-weight: 800;
        margin: 0 0 12px 0;
        letter-spacing: -0.025em;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .subtitle {
        font-size: 1.25rem;
        color: var(--text-muted);
        margin-bottom: 48px;
    }

    .getting-started {
        text-align: left;
        background: var(--sidebar-bg);
        padding: 32px;
        border-radius: 16px;
        margin-bottom: 40px;
    }

    .getting-started h2 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 24px;
    }

    .steps-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 24px;
    }

    .step {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .step-num {
        width: 32px;
        height: 32px;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
    }

    .step h3 {
        font-size: 1.1rem;
        margin: 0;
    }

    .step p {
        font-size: 0.95rem;
        color: var(--text-muted);
        margin: 0;
        line-height: 1.5;
    }

    .empty-state-hint {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: var(--primary);
        font-weight: 600;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: translateX(0); opacity: 1; }
        50% { transform: translateX(-5px); opacity: 0.7; }
    }

    @media (max-width: 640px) {
        .welcome-card {
            padding: 40px 24px;
        }

        h1 {
            font-size: 2.25rem;
        }

        .subtitle {
            font-size: 1.1rem;
        }
    }
</style>
