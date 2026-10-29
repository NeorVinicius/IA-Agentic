import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import Database from "better-sqlite3";

export function openDatabase(
  databasePath = process.env.DATABASE_PATH ?? "data/sitech.sqlite",
): Database.Database {
  const resolvedPath = resolve(databasePath);
  mkdirSync(dirname(resolvedPath), { recursive: true });

  const database = new Database(resolvedPath);
  database.pragma("journal_mode = WAL");
  return database;
}
