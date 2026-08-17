const express = require("express");
const router = express.Router();
const { findByShortCode, recordClick } = require("../models/urlModel");

router.get("/:shortCode", async (req, res) => {
    console.log("Redirect route hit");
    const { shortCode } = req.params;

    try {
        const url = await findByShortCode(shortCode);

        if (!url) {
            return res.status(404).json({
                error: "Short URL not found"
            });
        }

        console.log("Logging click for URL ID:", url.id);

        // "referer" is the actual (misspelled, but standard) HTTP
        // header name. It's only present if the visitor clicked the
        // link from somewhere (an email, a tweet, another site) --
        // pasting it directly into the browser sends no referrer.
        await recordClick(url.id, req.get("referer"));

        console.log("Click logged successfully!");

        res.redirect(url.long_url);

    } catch (error) {
        console.error("Error while logging click:");
        console.error(error);

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;