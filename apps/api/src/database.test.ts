import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { openDatabase } from "./database.js";

test("opens a SQLite database and executes a query", () => {
  const directory = mkdtempSync(join(tmpdir(), "sitech-"));
  const database = openDatabase(join(directory, "test.sqlite"));

  try {
    assert.deepEqual(database.prepare("SELECT 1 AS value").get(), { value: 1 });
  } finally {
    database.close();
    rmSync(directory, { recursive: true, force: true });
  }
});
