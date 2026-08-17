# URL Shortener API

A backend project built with **Node.js**, **Express**, and **PostgreSQL**.

## Features

- Shorten long URLs
- Store URLs in PostgreSQL
- REST API
- Cloud database using Neon

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Neon
- Postman

## Project Status

Completed:
- [x] Project setup
- [x] PostgreSQL connection
- [x] Save URLs into database
- [x] Redirect using short code
- [x] Click analytics (total clicks, clicks per day, top referrers)
- [x] Statistics endpoint
- [x] Deployment on Render

## Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (see `.env.example`) with your Neon connection string:
   ```
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   ```

3. Create the tables (safe to re-run, it won't touch existing data):
   ```bash
   node src/db/migrate.js
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Reference

### Shorten a URL
`POST /api/shorten`

```json
{ "longUrl": "https://example.com/some/very/long/path" }
```
Returns `201` with the created row (`id`, `short_code`, `long_url`, `created_at`).

### Visit a short URL
`GET /:shortCode`

Redirects to the original URL and logs a click. `404` if the code doesn't exist.

### Get stats for a short URL
`GET /api/stats/:shortCode`

```json
{
  "shortCode": "aZ3kQ1",
  "longUrl": "https://example.com/some/very/long/path",
  "totalClicks": 5,
  "clicksPerDay": [
    { "date": "2026-08-17T00:00:00.000Z", "clicks": 3 },
    { "date": "2026-08-16T00:00:00.000Z", "clicks": 2 }
  ],
  "topReferrers": [
    { "referrer": "https://twitter.com/", "clicks": 3 },
    { "referrer": "Direct / Unknown", "clicks": 2 }
  ]
}
```

## Deployment (Render)

1. Push this repo to GitHub (already done — `.env` stays out of git via `.gitignore`).
2. On [render.com](https://render.com), create a new **Web Service** and connect this repo.
3. Build command: `npm install`. Start command: `npm start`.
4. In the Render dashboard, add an environment variable `DATABASE_URL` set to your Neon connection string — never commit this value.
5. After the first deploy, open the Render **Shell** tab for the service and run `node src/db/migrate.js` once to create the tables (or run it locally against the same database before deploying).

> **Already deployed and adding referrer tracking?** Just run `node src/db/migrate.js` again (locally, pointed at your Neon DB, or from Render's Shell tab). It adds the new `referrer` column to your existing `clicks` table without touching any data already there.
