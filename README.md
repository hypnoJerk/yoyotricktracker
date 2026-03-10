# 🪀 YoYo Trick Tracker

A retro-styled, full-stack application to track your journey from yoyo beginner to pro! 🚀

## ✨ Features

- **🎮 Retro Aesthetic**: Beautiful pixel-art themed public landing page.
- **📊 Live Stats**: Track total tricks learned and completion percentage across all playlists.
- **📺 YouTube Integration**: Import entire yoyo trick playlists just by pasting a URL.
- **🔐 Private Dashboard**: Secure area to manage your progress and check off tricks as you learn them.
- **🛒 Item Shop**: Retro-styled gear section for your favorite yoyo recommendations.
- **🐳 Docker Ready**: Fully containerized for easy deployment.

---

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Database**: MariaDB / MySQL (`mysql2`)
- **Authentication**: `bcryptjs` + Cookie-based sessions
- **API**: YouTube Data API v3
- **Deployment**: Docker & Nginx

---

## 🚀 Getting Started

### 1. 📋 Prerequisites
- Node.js (v20+)
- MariaDB or MySQL server
- YouTube Data API Key (from [Google Cloud Console](https://console.cloud.google.com/))

### 2. 📥 Installation
```bash
cd yoyo-tracker
npm install
```

### 3. ⚙️ Configuration
Create/edit the `.env` file in the root directory:
```env
DATABASE_HOST=your_host
DATABASE_PORT=3306
DATABASE_NAME=yoyo_tracker
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
YOUTUBE_API_KEY=your_api_key_here
AUTH_SECRET=a_long_random_string_for_sessions
```

### 4. 🗄️ Database Setup
Initialize the database tables:
```bash
npm run db:init
```

### 5. 👤 Create Admin User
Create your login credentials for the dashboard:
```bash
npm run user:create your_username your_password
```

### 6. 🏃 Run the App

**Development Mode:**
```bash
npm run dev
```

**Production (Docker):**
```bash
docker-compose up --build -d
```

---

## 📁 Project Structure

- `src/lib/`: Core logic (DB connection, YouTube API, Auth).
- `src/routes/`: App pages and API endpoints.
- `scripts/`: Database initialization and user management scripts.
- `static/`: Pixel art assets and fonts.

---

## 📜 License
MIT

Happy Throwing! 🪀✨
