// lows.js：数新低，一次扫描，每个值只比一次
import { isLow } from "./track.js";

export function recordLows(values) {
  if (!values || values.length === 0) {
    const error = new Error("values 不能为空");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }
  const lows = [0];
  let lowest = values[0];
  let lowest_at = 0;
  for (let spot = 1; spot < values.length; spot += 1) {
    if (isLow(values[spot], lowest)) {
      lows.push(spot);
      lowest = values[spot];
      lowest_at = spot;
    }
  }
  return { lows: lows, lowest: lowest, lowest_at: lowest_at };
}
