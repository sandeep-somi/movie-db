import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import watchLaterSlice from '../redux/watch-later-slice'
import Layout from '../components/layout'
import { useSearchParams } from 'react-router-dom';

const WatchLater = () => {
  
  const { remveAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search')
  const movies = useSelector(({ watchLater }) => {
    if (!query) return watchLater?.watchLaterMovies
    return watchLater?.watchLaterMovies?.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
  })

  const removeAll = () => {
    dispatch(remveAllWatchLater())
  }

  const clearSearch = () => {
    setSearchParams()
  }

  return (
    <Layout
      title="Watch Later"
      subtitle="There are no movies saved to watch later."
      movies={movies}
      onClear={removeAll}
      query={query}
      clearSearch={clearSearch}
    />
  )
}

export default WatchLater
