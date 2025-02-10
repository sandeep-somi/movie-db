import React, { useRef } from 'react';
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { debounce } from "../../utils";
import Input from '../input';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [search, setSearch] = useState(searchQuery || '');
  const timeoutRef = useRef(null);

  useEffect(() => {
    setSearch(searchQuery || '');
  }, [searchQuery]);

  const getSearchResults = useCallback(query => {
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

  return (
    <div className="input-group rounded">
      <Input
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
  )
}

export default Search
