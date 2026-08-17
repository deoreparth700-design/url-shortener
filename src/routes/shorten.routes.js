const express = require("express");
const router = express.Router();
const { createUrl, findByShortCode } = require("../models/urlModel");

function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

// Math.random().toString(36) can occasionally produce a code shorter
// than 6 characters (it doesn't pad), so we build it from a fixed
// charset instead -- always exactly 6 characters, every time.
const CHARSET =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function generateShortCode(length = 6) {
    let code = "";
    for (let i = 0; i < length; i++) {
        code += CHARSET[Math.floor(Math.random() * CHARSET.length)];
    }
    return code;
}

// Codes are random, so in theory two requests could land on the same
// one. This checks the DB and retries a few times rather than trusting
// randomness alone.
async function generateUniqueShortCode() {
    const MAX_ATTEMPTS = 5;
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const code = generateShortCode();
        const existing = await findByShortCode(code);
        if (!existing) return code;
    }
    throw new Error("Could not generate a unique short code, please retry.");
}

router.post("/", async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({
            error: "longUrl is required"
        });
    }

    if (!isValidUrl(longUrl)) {
        return res.status(400).json({
            error: "longUrl must be a valid absolute URL, e.g. https://example.com"
        });
    }

    try {
        const shortCode = await generateUniqueShortCode();
        const row = await createUrl(shortCode, longUrl);

        res.status(201).json(row);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

module.exports = router;