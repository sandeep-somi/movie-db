import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../../redux/starredSlice'
import watchLaterSlice from '../../redux/watchLaterSlice'
import { BASE_MEDIA_URL } from '../../config'
import useCardOpen from '../../hooks/useCardOpen'
const Movie = ({ movie, viewTrailer }) => {
    const state = useSelector((state) => state)
    const { starred, watchLater } = state
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

    const dispatch = useDispatch()
    const { isOpen, toggleCard } = useCardOpen()

    const movieData = {
        id: movie.id,
        overview: movie.overview,
        release_date: movie.release_date?.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title
    }

    const onAddWatchLater = () => {
        dispatch(addToWatchLater(movieData))
    }

    const onRemoveWatchLater = () => {
        dispatch(removeFromWatchLater(movieData))
    }

    const onAddToStarred = () => {
        dispatch(starMovie(movieData))
    }

    const onRemoveFromStarred = () => {
        dispatch(unstarMovie(movieData))
    }

    const imgURL = (movie.poster_path) ? `${BASE_MEDIA_URL}${movie.poster_path}` : '/images/not-found-500X750.jpeg'

    // TODO : should refactor to reduce the component inline execution
    const isStarred = starred.starredMovies.map(movie => movie.id).includes(movie.id)
    const toWatch = watchLater.watchLaterMovies.map(movie => movie.id).includes(movie.id)
    
    return (
        <div className="movie-item wrapper">
            <div className={`card ${isOpen ? 'opened' : ''}`} onClick={toggleCard}> {/* TODO: use clsx or classnames */}
                <div className="card-body text-center">
                    <div className="overlay" />
                    <div className="info_panel">
                        <div className="overview">{movie.overview}</div>
                        <div className="year">{movie.release_date?.substring(0, 4)}</div>
                        {!isStarred ? (
                            <span className="btn-star" data-testid="starred-link" onClick={onAddToStarred}>
                                <i className="bi bi-star" />
                            </span>
                        ) : (
                            <span className="btn-star" data-testid="unstar-link" onClick={onRemoveFromStarred}>
                                <i className="bi bi-star-fill" data-testid="star-fill" />
                            </span>
                        )}
                        {!toWatch ? (
                            <button
                                type="button"
                                data-testid="watch-later"
                                className="btn btn-light btn-watch-later"
                                onClick={onAddWatchLater}>Watch Later</button>
                        ) : (
                            <button
                                type="button"
                                data-testid="remove-watch-later"
                                className="btn btn-light btn-watch-later blue"
                                onClick={onRemoveWatchLater}
                            >
                                <i className="bi bi-check"></i> Watch Later
                            </button>
                        )}
                        <button type="button" data-testid="view-trailer" className="btn btn-dark" onClick={() => viewTrailer(movie)}>View Trailer</button>
                    </div>
                    <img
                        className="center-block"
                        src={imgURL}
                        alt={movie.title}
                    />
                </div>
                <h6 className="title mobile-card">{movie.title}</h6>
                <h6 className="title">{movie.title}</h6>
                {isOpen && <button type="button" className="close" onClick={toggleCard} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>}
            </div>
        </div>
    )
}

export default Movie