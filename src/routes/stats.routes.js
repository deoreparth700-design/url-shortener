const express = require("express");
const router = express.Router();
const { findByShortCode, countClicks, getClicksPerDay, getTopReferrers } = require("../models/urlModel");

router.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await findByShortCode(shortCode);

        if (!url) {
            return res.status(404).json({
                error: "Short URL not found"
            });
        }

        const totalClicks = await countClicks(url.id);
        const clicksPerDay = await getClicksPerDay(url.id);
        const topReferrers = await getTopReferrers(url.id);

        res.json({
            shortCode: url.short_code,
            longUrl: url.long_url,
            totalClicks,
            clicksPerDay,
            topReferrers
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;