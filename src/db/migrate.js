const fs = require("fs");
const path = require("path");
const pool = require("./pool");

async function migrate() {
    try {
        const schemaPath = path.join(__dirname, "schema.sql");
        const schema = fs.readFileSync(schemaPath, "utf-8");

        console.log("Running schema.sql against the database...");
        await pool.query(schema);
        console.log("✅ Tables are ready (urls, clicks).");
    } catch (error) {
        console.error("❌ Migration failed");
        console.error(error);
    } finally {
        await pool.end();
    }
}

migrate();
