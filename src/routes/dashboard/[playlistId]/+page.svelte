<script lang="ts">
    import { fade } from 'svelte/transition';

    let { data } = $props();

    let videos = $state(data.videos);

    let learnedCount = $derived(videos.filter(v => v.learned).length);
    let totalCount = $derived(videos.length);
    let progressPercent = $derived(totalCount > 0 ? (learnedCount / totalCount) * 100 : 0);

    async function toggleLearned(video: { id: number; learned: boolean }) {
        const newStatus = !video.learned;

        const res = await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoId: video.id, learned: newStatus })
        });

        if (res.ok) {
            video.learned = newStatus;
        } else {
            const err = await res.json();
            alert(err.message || 'Error updating progress');
        }
    }
</script>

<div class="playlist-header" in:fade>
    <div class="header-content">
        <h1>{data.playlist.name}</h1>
        <div class="stats">
            <span class="count">{learnedCount} / {totalCount} tricks learned</span>
            <span class="percentage">{progressPercent.toFixed(0)}%</span>
        </div>
    </div>

    <div class="progress-container">
        <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: {progressPercent}%">
                {#if progressPercent > 5}
                    <div class="shimmer"></div>
                {/if}
            </div>
        </div>
    </div>
</div>

<div class="video-grid">
    {#each videos as video (video.id)}
        <div class="video-card" class:learned={video.learned} in:fade={{ delay: 100 }}>
            <label class="checkbox-wrapper" aria-label="Mark as learned">
                <input type="checkbox" checked={video.learned} onchange={() => toggleLearned(video)} />
                <span class="checkmark">
                    {#if video.learned}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {/if}
                </span>
            </label>

            <div class="thumbnail">
                <img src={video.thumbnail_url} alt={video.title} loading="lazy" />
                {#if video.learned}
                    <div class="learned-overlay" transition:fade>
                        <span class="learned-badge">LEARNED</span>
                    </div>
                {/if}
            </div>

            <div class="info">
                <a href="https://youtube.com/watch?v={video.video_id}" target="_blank" rel="noreferrer" class="video-title">
                    {video.title}
                </a>
                <div class="card-footer">
                    <span class="position">Trick #{video.position + 1}</span>
                    <a href="https://youtube.com/watch?v={video.video_id}" target="_blank" rel="noreferrer" class="watch-link">
                        Watch on YouTube
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    h1 {
        margin: 0 0 8px 0;
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: -0.025em;
    }

    .playlist-header {
        margin-bottom: 40px;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 16px;
        flex-wrap: wrap;
        gap: 16px;
    }

    .stats {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .count {
        color: var(--text-muted);
        font-weight: 500;
    }

    .percentage {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary);
    }

    .progress-container {
        width: 100%;
    }

    .progress-bar-bg {
        width: 100%;
        height: 12px;
        background: var(--progress-bg);
        border-radius: 100px;
        overflow: hidden;
    }

    .progress-bar-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
    }

    .shimmer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    .video-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .video-card {
        display: grid;
        grid-template-columns: auto auto 1fr;
        align-items: center;
        gap: 20px;
        padding: 16px;
        border: 1px solid var(--border-color);
        border-radius: 16px;
        background: var(--card-bg);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
    }

    .video-card:hover {
        border-color: var(--primary);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
    }

    .video-card.learned {
        background: var(--card-learned-bg);
        border-color: var(--accent);
    }

    .checkbox-wrapper {
        display: block;
        position: relative;
        width: 32px;
        height: 32px;
        cursor: pointer;
        user-select: none;
    }

    .checkbox-wrapper input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 32px;
        width: 32px;
        background-color: var(--progress-bg);
        border: 2px solid var(--border-color);
        border-radius: 10px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .checkbox-wrapper:hover input ~ .checkmark {
        border-color: var(--primary);
    }

    .checkbox-wrapper input:checked ~ .checkmark {
        background-color: var(--accent);
        border-color: var(--accent);
    }

    .checkmark svg {
        width: 20px;
        height: 20px;
    }

    .thumbnail {
        position: relative;
        width: 160px;
        aspect-ratio: 16/9;
        border-radius: 8px;
        overflow: hidden;
        background: #000;
    }

    .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
    }

    .video-card:hover .thumbnail img {
        transform: scale(1.05);
    }

    .learned-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(16, 185, 129, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .learned-badge {
        background: var(--accent);
        color: white;
        font-size: 0.7rem;
        font-weight: 800;
        padding: 4px 8px;
        border-radius: 4px;
        letter-spacing: 0.05em;
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 90px;
    }

    .video-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-color);
        text-decoration: none;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 0.2s;
    }

    .video-title:hover {
        color: var(--primary);
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;
    }

    .position {
        font-size: 0.8rem;
        color: var(--text-muted);
        font-weight: 500;
    }

    .watch-link {
        font-size: 0.8rem;
        color: var(--primary);
        text-decoration: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .watch-link:hover {
        text-decoration: underline;
    }

    @media (max-width: 640px) {
        .video-card {
            grid-template-columns: auto 1fr;
            gap: 16px;
            padding: 12px;
        }

        .checkbox-wrapper {
            grid-row: 1 / 2;
            grid-column: 1 / 2;
        }

        .thumbnail {
            width: 120px;
            grid-row: 1 / 2;
            grid-column: 2 / 3;
        }

        .info {
            grid-column: 1 / 3;
            min-height: auto;
        }

        .video-title {
            font-size: 1rem;
            margin-top: 8px;
        }

        .percentage {
            font-size: 1.25rem;
        }
    }

    @media (max-width: 480px) {
        .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }

        .thumbnail {
            width: 100px;
        }
    }
</style>
