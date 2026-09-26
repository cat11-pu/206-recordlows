// track.js：比一步——严格小于当前最低才算新低
export function isLow(current, lowest) {
  return current < lowest;
}
