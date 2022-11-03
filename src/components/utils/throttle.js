/**
 * Thrrottle the given function
 * @param func {Function} the function to throttle
 * @param wait {Number} the time in ms to wait
 */
export function throttle(func, wait) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  
  let throttlePause;
  return () => {
    if (throttlePause) {
      return;
    }
    throttlePause = true;
    setTimeout(() => {
      func();
      throttlePause = false;
    }, wait);
  };
}
