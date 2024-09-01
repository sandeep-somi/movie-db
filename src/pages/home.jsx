import React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, resetMovies } from '../redux/moviesSlice'
import Movies from '../components/movies'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const Discover = () => {
  const dispatch = useDispatch();
  const { movies, hasMore, page, loading } = useSelector((state) => state.movies);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search');

  useEffect(() => {
    dispatch(resetMovies());
    dispatch(fetchMovies({ page: 1, query }));
  }, [query, dispatch]);

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      dispatch(fetchMovies({ page: page + 1, query }));
    }
  };

  const lastElementRef = useInfiniteScroll(loadMoreMovies, hasMore, loading);
  const shouldShowLoading = loading || hasMore
  const hasMovies = movies.length

  return (
    <>
      <Movies movies={movies} />
      <div className='common-last-element' ref={lastElementRef}>
        {shouldShowLoading ? <Loading /> : (
          <>
            {hasMovies ? <p>No more results found</p> : (
              <div>
                <p>No Results Found</p>
                <p>{query && 'For: '} {query}</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Discover

const Loading = () => (
  <div>Loading...</div>
)