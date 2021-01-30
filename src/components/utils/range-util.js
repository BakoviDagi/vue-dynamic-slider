/**
 * Keep the given number within the given upper and lower bounds
 *
 * @param num {Number} number to keep in range
 * @param lower {Number} lower bound of the range
 * @param upper {Number} upper bound of the range
 * @returns {Number} the lower bound when num is below it, the upper bound when num is above it, or num if it's between them
 */
export function keepInRange(num, lower, upper) {
  if (num < lower) {
    return lower;
  } else if (num > upper) {
    return upper;
  }
  return num;
}
