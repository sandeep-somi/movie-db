export const debounce = (callback, delay = 300, timeoutRef) => {
  return (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}