const express = require("express");

const shortenRoutes = require("./routes/shorten.routes");
const redirectRoutes = require("./routes/redirect.routes");
const statsRoutes = require("./routes/stats.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the URL Shortener API 🚀");
});

// Order matters: these two are checked before "/" (the redirect
// catch-all) so "/api/shorten" and "/api/stats/xyz" don't get
// mistaken for a short code.
app.use("/api/shorten", shortenRoutes);
app.use("/api/stats", statsRoutes);
app.use("/", redirectRoutes);

module.exports = app;