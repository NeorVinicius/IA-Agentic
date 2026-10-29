import assert from "node:assert/strict";
import { test } from "node:test";
import request from "supertest";
import { app } from "./app.js";

test("GET /api/health reports that the API is available", async () => {
  const response = await request(app).get("/api/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});
