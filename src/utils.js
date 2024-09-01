export const debounce = (callback, delay = 300) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}