// app.js：渲染结果
import { isLow } from "./track.js";
import { recordLows } from "./lows.js";

export function render(spec) {
  const values = spec.values || [];
  const view = recordLows(values);
  const lows = view.lows || [];
  return { lows: lows, count: lows.length, lowest: view.lowest || 0,
           lowest_at: view.lowest_at || 0, value_count: values.length,
           first_counted: lows.length > 0 ? lows[0] === 0 : true };
}
