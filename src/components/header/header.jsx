import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import Search from '../search/search';

const Header = () => {
  const { starredMovies } = useSelector(state => state.starred);

  const renderStarredIcon = () => {
    if (starredMovies.length) {
      return <>
        <i className="bi bi-star-fill bi-star-fill-white" />
        <sup className="star-number">{starredMovies.length}</sup>
      </>
    }

    return <i className="bi bi-star" />
  }

  return (
    <header data-testid='movie-db-header'>
      <Link to="/" data-testid="home">
        <i className="bi bi-film" />
      </Link>
      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {renderStarredIcon()}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          Watch Later
        </NavLink>
      </nav>
      <Search />
    </header>
  );
};

export default Header;