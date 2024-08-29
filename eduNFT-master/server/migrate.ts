import { migrate } from "drizzle-orm/mysql2/migrator";
import { db, connection } from ".";
async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: "./server/migrations" });
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Failed to run migrations:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("Database connection closed.");
    }
  }
}

runMigrations();
