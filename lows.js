// lows.js：数新低（基线：一律给空表）
import { isLow } from "./track.js";

export function recordLows(values) {
  return { lows: [], lowest: 0, lowest_at: 0 };
}
