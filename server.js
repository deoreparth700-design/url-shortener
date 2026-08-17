const app = require("./src/app");
const pool = require("./src/db/pool");

const PORT = 3000;

async function startServer() {
    try {
        // Test the database connection
        const result = await pool.query("SELECT NOW()");

        console.log("✅ Connected to PostgreSQL");
        console.log("Database Time:", result.rows[0].now);

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Database connection failed");
        console.error(error); // Print the FULL error
    }
}

startServer();