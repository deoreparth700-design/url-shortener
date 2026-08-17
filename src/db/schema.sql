-- One row per shortened link.
CREATE TABLE IF NOT EXISTS urls (
    id SERIAL PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    long_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- One row per time a short link is visited.
CREATE TABLE IF NOT EXISTS clicks (
    id SERIAL PRIMARY KEY,
    url_id INTEGER NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
    clicked_at TIMESTAMP DEFAULT NOW(),
    referrer TEXT
);

-- If the clicks table already existed from before referrer tracking
-- was added, this adds the column without touching existing rows
-- (their referrer will just be NULL, meaning "unknown").
ALTER TABLE clicks ADD COLUMN IF NOT EXISTS referrer TEXT;

CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);
CREATE INDEX IF NOT EXISTS idx_clicks_url_id ON clicks(url_id);
