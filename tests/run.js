import assert from "node:assert";
import { isLow } from "../track.js";
import { recordLows } from "../lows.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("isLow returns a boolean", () => {
  assert.strictEqual(typeof isLow(2, 5), "boolean");
});

check("recordLows returns lows", () => {
  assert.ok(Array.isArray(recordLows([3, 1]).lows));
});

check("recordLows returns lowest", () => {
  assert.strictEqual(typeof recordLows([3, 1]).lowest, "number");
});

check("render counts lows", () => {
  assert.strictEqual(typeof render({ values: [3, 1] }).count, "number");
});

check("render exposes lowest position", () => {
  assert.strictEqual(typeof render({ values: [3, 1] }).lowest_at, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
