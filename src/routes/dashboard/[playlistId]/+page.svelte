<script>
    let { data } = $props();
    let videos = $state(data.videos);

    const learnedCount = $derived(videos.filter(v => v.learned).length);
    const totalCount = $derived(videos.length);
    const progressPercent = $derived(totalCount > 0 ? (learnedCount / totalCount) * 100 : 0);

    async function toggleLearned(video) {
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

<h1>{data.playlist.name}</h1>

<div class="progress-container">
    <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: {progressPercent}%"></div>
    </div>
    <p>{learnedCount} / {totalCount} learned ({progressPercent.toFixed(0)}%)</p>
</div>

<div class="video-list">
    {#each videos as video}
        <div class="video-card {video.learned ? 'learned' : ''}">
            <div class="checkbox-container">
                <input type="checkbox" checked={video.learned} onchange={() => toggleLearned(video)} />
            </div>
            <div class="thumbnail">
                <img src={video.thumbnail_url} alt={video.title} />
            </div>
            <div class="info">
                <a href="https://youtube.com/watch?v={video.video_id}" target="_blank">{video.title}</a>
            </div>
        </div>
    {/each}
</div>

<style>
    .progress-container {
        margin-bottom: 20px;
    }
    .progress-bar-bg {
        width: 100%;
        height: 10px;
        background: #eee;
        border-radius: 5px;
        overflow: hidden;
    }
    .progress-bar-fill {
        height: 100%;
        background: #4caf50;
        transition: width 0.3s ease;
    }
    .video-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .video-card {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: white;
        transition: background 0.3s;
    }
    .video-card.learned {
        background: #e8f5e9;
        opacity: 0.8;
    }
    .checkbox-container input {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .thumbnail img {
        width: 120px;
        border-radius: 4px;
    }
    .info a {
        font-weight: bold;
        color: #333;
        text-decoration: none;
    }
    .info a:hover {
        text-decoration: underline;
    }
</style>
