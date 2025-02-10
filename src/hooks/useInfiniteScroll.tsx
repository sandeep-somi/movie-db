import { useRef, useCallback } from 'react';

const useInfiniteScroll = (callback, hasMore, loading) => {
  const observer = useRef<IntersectionObserver | null>();

  const lastElementRef = useCallback((node?: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        callback();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, callback]);

  return lastElementRef;
};

export default useInfiniteScroll;