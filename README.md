# SquadUp

SquadUp is a full-stack gamer social platform: discover teammates, share gaming moments, form squads, and message players.

## Included

- Responsive React/Vite client with landing, auth, feed, discovery, squads, chat, profiles, communities, settings, search, and notifications
- MongoDB data models for users, posts/comments, squads, messages, communities, and notifications
- Secure email/username authentication using bcrypt password hashing and JWT sessions
- Protected REST APIs for profile updates, following, posts, likes/comments, squads, conversations/messages, communities, and notifications

## Run locally

1. Configure the server environment. A local `server/.env` is already present and is ignored by Git. For a fresh clone, copy `server/.env.example` to `server/.env`, then set `MONGODB_URI` and a long unique `JWT_SECRET`.
2. Install dependencies:

   ```bash
   npm install
   npm --prefix server install
   ```

3. In two terminals run:

   ```bash
   npm run server
   npm run dev
   ```

The client opens at `http://localhost:5173`; the API listens on `http://localhost:5000`.

## Deploy to Vercel

This repository is configured as a single Vercel deployment: the React client is built to `dist` and `api/[...path].js` runs the Express API as a serverless function.

1. Push this folder to GitHub and import it in Vercel.
2. Add these Vercel environment variables for **Production**, **Preview**, and **Development**:

   ```text
   MONGODB_URI=your MongoDB Atlas URI
   JWT_SECRET=a long random secret
   CLIENT_URL=https://your-project.vercel.app
   ```

3. In MongoDB Atlas, allow network access from Vercel (or temporarily use `0.0.0.0/0` while developing) and create a database user with only the needed access.
4. Deploy. The client uses same-origin `/api`, so no `VITE_API_URL` is required in Vercel.

Vercel functions are request/response based. Post likes, follows, comments, messages and notifications persist through the REST API; instant typing/presence and push-style chat delivery need a Socket.IO-compatible realtime service such as Pusher, Ably, or Supabase Realtime.

## API overview

`POST /api/auth/register`, `POST /api/auth/login`, and `GET /api/auth/me` establish the session. All remaining API endpoints require `Authorization: Bearer <token>`.

- `/api/users` — discovery, profiles, profile updates, follows
- `/api/posts` — feed, creation, deletion, likes, comments
- `/api/squads` — list, create, detail, join
- `/api/messages` — conversations and direct messages
- `/api/communities` — list, create, detail, join
- `/api/notifications` — list and mark read

## Notes

Media fields currently accept hosted image/video URLs. File storage and real-time Socket.IO delivery are intentionally left as future integrations; the message model/API is structured to support them.
