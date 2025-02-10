import React from 'react'
import { Link } from 'react-router-dom'
import Movies from '../movies/movies'
import Button from '../button/button';
import { TMovie } from '../../redux/types';

type TLayout = {
  movies: TMovie[]
  title: string
  subtitle: string
  onClear: () => void
  query?: string
  clearSearch?: () => void
}

const Layout = ({
  movies,
  title,
  subtitle,
  onClear,
  query,
  clearSearch,
}: TLayout) => {
  const renderMovies = () => {
    if (!!movies.length) {
      return (
        <div>
          <div className="layout__title">
            <h6 className="layout__header">{title}</h6>
            <Button className="btn btn-danger" onClick={onClear}>
              Remove All
            </Button>
          </div>
          <Movies movies={movies} />
        </div>
      );
    }

    return (
      <div className="common-last-element">
        <i className="bi bi-star" />
        <p>
          {subtitle} {query && `for: "${query}"`}
        </p>
        {query ? (
          <Button
            className="btn btn-primary btn-sm mt-2"
            data-testid="reset-search"
            onClick={clearSearch}
          >
            Reset search
          </Button>
        ) : (
          <p>
            Go to <Link to="/">Home</Link>
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="layout" data-testid="layout">
      {renderMovies()}
    </div>
  );
};

export default Layout
