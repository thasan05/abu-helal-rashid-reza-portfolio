import fs from "fs";
import path from "path";
import { query } from "./client";

export async function runMigrations() {
  console.log("Running database migrations...");
  const schemaPath = path.join(process.cwd(), "src", "lib", "db", "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  // Strip SQL comments cleanly
  const cleanSql = schemaSql
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  // Split schema into separate statements by semicolon
  const statements = cleanSql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    try {
      await query(statement);
    } catch (err) {
      console.error("Migration error executing statement:", statement.substring(0, 100), err);
      throw err;
    }
  }

  console.log("Database migrations applied successfully.");
}

if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
