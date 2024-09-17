import React from 'react'
import { useState } from 'react'
import Modal from '../modal'
import Movie from './movie'
import { getMovieAPI } from '../../apis'
import YouTubePlayer from '../video-player/youtube-player'
import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../../redux/starred-slice'
import watchLaterSlice from '../../redux/watch-later-slice'
import { createSelector } from '@reduxjs/toolkit'

const selectStarredIds = (state) => state?.starred?.ids;
const selectWatchLaterIds = (state) => state?.watchLater?.ids;

const selectIds = createSelector(
    [selectStarredIds, selectWatchLaterIds],
    (starredIds, watchLaterIds) => ({
        starredIds,
        watchLaterIds,
    })
);

const { starMovie, unstarMovie } = starredSlice.actions
const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

const Movies = ({ movies }) => {
    const [videoKey, setVideoKey] = useState()
    const { starredIds, watchLaterIds } = useSelector(selectIds);
    const dispatch = useDispatch()
    

    const viewTrailer = (movie) => {
        getMovie(movie.id)
    }

    const toggleStarred = movie => () => {
        if (starredIds.includes(movie.id)) {
            dispatch(unstarMovie(movie))
        } else {
            dispatch(starMovie(movie))
        }
    }

    const toggleWatchLater = movie => () => {
        if (watchLaterIds.includes(movie.id)) {
            dispatch(removeFromWatchLater(movie))
        } else {
            dispatch(addToWatchLater(movie))
        }
    }

    const getMovie = async (id) => {
        const { videos = [] } = await getMovieAPI(id)
        if (videos?.results?.length) {
            const trailer = videos.results.find((vid) => vid.type === 'Trailer')
            setVideoKey(trailer ? trailer.key : videos.results[0].key)
        }
    }

    return (
        <>
            <div data-testid="movies" className='movie-list'>
                {movies?.map((movie) => {
                    const isStarred = starredIds.includes(movie.id)
                    const watchLater = watchLaterIds.includes(movie.id)
                    return (
                        <Movie
                            movie={movie}
                            key={movie.id}
                            viewTrailer={viewTrailer}
                            toggleStarred={toggleStarred(movie)}
                            toggleWatchLater={toggleWatchLater(movie)}
                            watchLater={watchLater}
                            isStarred={isStarred}
                        />
                    )
                })}
            </div>
            <Modal data-testid="modal" isOpen={!!videoKey} onClose={() => setVideoKey('')}>
                <YouTubePlayer videoKey={videoKey} />
            </Modal>
        </>
    )
}

export default Movies
