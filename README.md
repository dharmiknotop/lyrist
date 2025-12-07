# Lyrist 🎵

A simple, easy-to-use app for getting lyrics from your favorite artists. Built with a modern tech stack featuring GraphQL API and Next.js frontend.

> **Learning Project:** This project was created to learn and practice **GraphQL** and **Redis** caching in a real-world application.

- **Live Demo:** https://lyrist-pi.vercel.app/
- **API Endpoint:** https://lyrist-api.onrender.com/graphql

<br/>

<img width="901" height="767" alt="image" src="https://github.com/user-attachments/assets/4da4b013-8f65-4325-82f7-60c62c61100a" />

<br/>

## ✨ Features

- 🔍 Search lyrics by artist name and song title
- ⚡ Fast and responsive GraphQL API
- 🎨 Modern, dark-themed UI with Material Tailwind
- 📱 Mobile-responsive design
- 🚀 Real-time loading states with progress messages
- ❌ Intelligent error handling with user-friendly messages
- 🎯 Capitalized song and artist display

## 🏗️ Built With

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Material Tailwind** - UI component library
- **Axios** - HTTP client for API requests
- **Custom Hooks** - Reusable React logic patterns

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Apollo Server v4** - GraphQL server
- **Axios** - HTTP requests to Lyrics.ovh API
- **Upstash Redis** - Caching layer (optional)

### APIs

- **Lyrics.ovh API** - Free lyrics database

## 🛠️ Installation and Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/dharmiknotop/lyrist.git
cd lyrist
```

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `server/config` directory (optional for Redis):

```env
# Optional: Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

4. Start the server:

```bash
npm run dev
```

The GraphQL API will be available at `http://localhost:8000/graphql`

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

4. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🚀 Deployment

### Backend (Render)

The backend is deployed on Render with the following configuration:

- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variable: `PORT` (automatically set by Render)

### Frontend (Vercel)

The frontend is deployed on Vercel:

- Framework: Next.js
- Environment Variable: `NEXT_PUBLIC_SERVER_URL=https://lyrist-api.onrender.com`

## 📝 GraphQL API Usage

### Query Example

```graphql
query GetLyrics {
  getLyrics(artist: "Eminem", title: "Beautiful") {
    lyrics
    title
    artist
    error
  }
}
```

### Response Example

```json
{
  "data": {
    "getLyrics": {
      "lyrics": "Lately I've been hard to reach...",
      "title": "Beautiful",
      "artist": "Eminem",
      "error": null
    }
  }
}
```

## 🏛️ Architecture

### Frontend Structure

```
client/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── types/            # TypeScript definitions
│   └── constants/        # Configuration constants
```

### Backend Structure

```
server/
├── config/              # Configuration files
├── services/            # Business logic (LyricsService, CacheService)
├── resolver/            # GraphQL resolvers
├── type.js             # GraphQL type definitions
└── index.js            # Server entry point
```

---

⭐️ If you find this project helpful, please give it a star!
