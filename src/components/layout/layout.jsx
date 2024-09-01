import React from 'react'
import { Link } from 'react-router-dom'
import Movies from '../movies/movies'

const Layout = ({ movies, title, subtitle, onClear, query, clearSearch }) => {
  const hasMovies = !!movies.length;
  return (
    <div className="layout" data-testid="layout">
      {hasMovies && (
        <div>
          <div className="layout__title">
            <h6 className="layout__header">{title}</h6>
            <button className="btn btn-danger" onClick={onClear}>Remove All</button>
          </div>
          <Movies movies={movies} />
        </div>
      )}

      {!hasMovies && (
        <div className="common-last-element">
          <i className="bi bi-star" />
          <p>{subtitle} {query && `for: "${query}"`}</p>
          {query ? (
            <button className="btn btn-primary btn-sm mt-2" data-testid="reset-search" onClick={clearSearch}>Reset search</button>
          ) : (
              <p>Go to <Link to='/'>Home</Link></p>
          )}
        </div>
      )}
    </div>
  )
}

export default Layout
