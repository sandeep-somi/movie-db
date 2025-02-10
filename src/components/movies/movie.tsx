import React, { memo } from 'react';
import { BASE_MEDIA_URL } from '../../config'
import useCardOpen from '../../hooks/useCardOpen'
import { TMovie } from '../../redux/types';

type TMovieComponent = {
    movie: TMovie
    viewTrailer: (movie: TMovie) => void
    isStarred: boolean
    watchLater: boolean,
    toggleStarred: () => void
    toggleWatchLater: () => void
}

const Movie = ({
  movie,
  viewTrailer,
  isStarred,
  watchLater,
  toggleStarred,
  toggleWatchLater,
}: TMovieComponent) => {
  const { isOpen, toggleCard } = useCardOpen();

  const imgURL = movie.poster_path
    ? `${BASE_MEDIA_URL}${movie.poster_path}`
    : "/images/not-found-500X750.jpeg";

  return (
    <div className="movie-item wrapper">
      <div className={`card ${isOpen ? "opened" : ""}`} onClick={toggleCard}>
        {" "}
        {/* TODO: use clsx or classnames */}
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <div className="overview">{movie.overview}</div>
            <div className="year">{movie.release_date?.substring(0, 4)}</div>
            {!isStarred ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={toggleStarred}
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={toggleStarred}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            {!watchLater ? (
              <button
                type="button"
                data-testid="watch-later"
                className="btn btn-light btn-watch-later"
                onClick={toggleWatchLater}
              >
                Watch Later
              </button>
            ) : (
              <button
                type="button"
                data-testid="remove-watch-later"
                className="btn btn-light btn-watch-later blue"
                onClick={toggleWatchLater}
              >
                <i className="bi bi-check"></i> Watch Later
              </button>
            )}
            <button
              type="button"
              data-testid="view-trailer"
              className="btn btn-dark"
              onClick={() => viewTrailer(movie)}
            >
              View Trailer
            </button>
          </div>
          <img className="center-block" src={imgURL} alt={movie.title} />
        </div>
        <h6 className="title mobile-card">{movie.title}</h6>
        <h6 className="title">{movie.title}</h6>
        {isOpen && (
          <button
            type="button"
            className="close"
            onClick={toggleCard}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(Movie)
