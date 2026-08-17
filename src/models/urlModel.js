const pool = require("../db/pool");

// Create a new short URL
async function createUrl(shortCode, longUrl) {
    const result = await pool.query(
        `INSERT INTO urls (short_code, long_url)
         VALUES ($1, $2)
         RETURNING id, short_code, long_url, created_at`,
        [shortCode, longUrl]
    );

    return result.rows[0];
}

// Find a URL by its short code
async function findByShortCode(shortCode) {
    const result = await pool.query(
        `SELECT id, short_code, long_url, created_at
         FROM urls
         WHERE short_code = $1`,
        [shortCode]
    );

    return result.rows[0];
}

// Record a click
async function recordClick(urlId, referrer) {
    await pool.query(
        `INSERT INTO clicks (url_id, referrer)
         VALUES ($1, $2)`,
        [urlId, referrer || null]
    );
}

// Count clicks
async function countClicks(urlId) {
    const result = await pool.query(
        `SELECT COUNT(*)::int AS total
         FROM clicks
         WHERE url_id = $1`,
        [urlId]
    );

    return result.rows[0].total;
}

// Get recent clicks
async function getRecentClicks(urlId, limit = 10) {
    const result = await pool.query(
        `SELECT clicked_at
         FROM clicks
         WHERE url_id = $1
         ORDER BY clicked_at DESC
         LIMIT $2`,
        [urlId, limit]
    );

    return result.rows;
}

// Clicks grouped by calendar day, most recent day first.
// DATE(clicked_at) strips the time portion so every click from the
// same day (e.g. 2026-08-17 09:12 and 2026-08-17 21:45) lands in the
// same bucket -- that's what makes the GROUP BY work.
async function getClicksPerDay(urlId) {
    const result = await pool.query(
        `SELECT DATE(clicked_at) AS date, COUNT(*)::int AS clicks
         FROM clicks
         WHERE url_id = $1
         GROUP BY DATE(clicked_at)
         ORDER BY date DESC`,
        [urlId]
    );

    return result.rows;
}

// Top referrers, most clicks first. A browser doesn't always send a
// referrer (e.g. someone pasting the link directly into the address
// bar), so those clicks are grouped together as "Direct / Unknown"
// instead of being dropped or shown as a blank string.
async function getTopReferrers(urlId, limit = 5) {
    const result = await pool.query(
        `SELECT COALESCE(referrer, 'Direct / Unknown') AS referrer,
                COUNT(*)::int AS clicks
         FROM clicks
         WHERE url_id = $1
         GROUP BY referrer
         ORDER BY clicks DESC
         LIMIT $2`,
        [urlId, limit]
    );

    return result.rows;
}

module.exports = {
    createUrl,
    findByShortCode,
    recordClick,
    countClicks,
    getRecentClicks,
    getClicksPerDay,
    getTopReferrers
};