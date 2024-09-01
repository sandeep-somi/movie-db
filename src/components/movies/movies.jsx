import React from 'react'
import { useState } from 'react'
import Modal from '../modal'
import Movie from './movie'
import { getMovieAPI } from '../../apis'
import YouTubePlayer from '../video-player/youtube-player'

const Movies = ({ movies }) => {
    const [videoKey, setVideoKey] = useState()

    const viewTrailer = (movie) => {
        getMovie(movie.id)
    }

    const getMovie = async (id) => {
        const { videos = [] } = await getMovieAPI(id)
        if (videos?.results?.length) {
            const trailer = videos.results.find((vid) => vid.type === 'Trailer')
            console.log(trailer)
            setVideoKey(trailer ? trailer.key : videos.results[0].key)
        }
    }

    return (
        <>
            <div data-testid="movies" className='movie-list'>
                {movies?.map((movie) => {
                    return (
                        <Movie
                            movie={movie}
                            key={movie.id}
                            viewTrailer={viewTrailer}
                        />
                    )
                })}
            </div>
            <Modal isOpen={!!videoKey} onClose={() => setVideoKey('')}>
                <YouTubePlayer videoKey={videoKey} />
            </Modal>
        </>
    )
}

export default Movies
