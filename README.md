# DevChat

A simple chat app connecting React frontend with Express backend, powered by Google Gemini AI.

## Why

Wanted to build something that actually calls an external API and handles the full flow - user input, server request, AI response, displaying it back. Learned a lot about connecting frontend to backend.

## Tech

- Node.js
- React 19 + Vite
- Tailwind CSS 4
- Express.js
- React-Router 
- Google Gemini 2.5 Flash

## Setup

```bash
# Backend
cd backend
npm install
# Add .env with GEMINI_API_KEY
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## Config

Backend needs:

- `GEMINI_API_KEY` - get from Google AI Studio
- `PORT` - defaults to 5000

Frontend needs:

- `VITE_BACKEND_URL` - backend URL

## Running

Server runs on port 5000, frontend on 5173.

## Features

- Theme toggle (dark/light)
- Typing animation
- Cancel responses
- Quick suggestions
