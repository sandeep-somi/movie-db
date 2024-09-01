import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import starredSlice from '../redux/starredSlice'
import Layout from '../components/layout'
import { useSearchParams } from 'react-router-dom';


const Starred = () => {
  const { clearAllStarred } = starredSlice.actions
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search')
  
  const movies = useSelector(({ starred }) => {
    if (!query) return starred?.starredMovies
    return starred?.starredMovies?.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
  })

  const dispatch = useDispatch()
  const onClear = () => {
    dispatch(clearAllStarred())
  }

  const clearSearch = () => {
    setSearchParams()
  }

  return (
    <Layout
      title="Starred"
      subtitle="There are no starred movies."
      movies={movies}
      onClear={onClear}
      query={query}
      clearSearch={clearSearch}
    />
  )
}

export default Starred

