/**
 * Cubic function for scrolling
 *
 * @param currentTime {Number} time (ms) of the function (time elapsed since starting to scroll)
 * @param initialValue {Number} initial value (initial slider offset)
 * @param finalValue {Number} final value (desired slider offset)
 * @param duration {Number} total duration (ms) of the function (how long to scroll for)
 * @returns {Number} the current "position" between initial and final value based on current time
 */
export function easeOutCubic (currentTime, initialValue, finalValue, duration) {
  let changeInValue = finalValue - initialValue;
  currentTime /= duration;
  currentTime--;
  return changeInValue * (currentTime * currentTime * currentTime + 1) + initialValue;
}