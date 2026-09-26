// lows.js：数新低——第一个值算一次新低，之后严格更小的值才算
import { isLow } from "./track.js";

export function recordLows(values) {
  if (!values || values.length === 0) {
    const error = new Error("values must not be empty");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }
  const lows = [0];
  let lowest = values[0];
  let lowestAt = 0;
  for (let i = 1; i < values.length; i += 1) {
    if (isLow(values[i], lowest)) {
      lows.push(i);
      lowest = values[i];
      lowestAt = i;
    }
  }
  return { lows: lows, lowest: lowest, lowest_at: lowestAt };
}
