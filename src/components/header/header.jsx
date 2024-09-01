import React, { useRef } from 'react';
import { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useSearchParams, createSearchParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { debounce } from "../../utils";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [search, setSearch] = useState(searchQuery || '');
  const timeoutRef = useRef(null);

  useEffect(() => {
    setSearch(searchQuery || '');
  }, [searchQuery]);

  const getSearchResults = useCallback(query => {
    console.log('test', query);
    if (query !== '') {
      setSearchParams(createSearchParams({ search: query }), { replace: true })
    } else {
      setSearchParams()
    }
  }, [setSearchParams])

  const debouncedSearchMovies = useCallback(value => {
    debounce(getSearchResults, 500, timeoutRef)(value)
  }, [getSearchResults])

  const onSearch = ({ target: { value } }) => {
    setSearch(value);
    debouncedSearchMovies(value);
  };

  const { starredMovies } = useSelector(state => state.starred);

  return (
    <header data-testid='movie-db-header'>
      <Link to="/" data-testid="home">
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          Watch Later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          onChange={onSearch}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
          value={search}
        />
      </div>
    </header>
  );
};

export default Header;