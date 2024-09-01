import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../redux/watchLaterSlice'
import Movies from '../components/movies';
import './starred.scss'

const WatchLater = () => {
  const { watchLater } = useSelector((state) => state)
  const { remveAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()

  const removeAll = () => {
    dispatch(remveAllWatchLater())
  }

  const hasMovies = !!watchLater.watchLaterMovies.length;

  return (
    <div className="starred" data-testid="watch-later-div">
      {hasMovies && (<div data-testid="watch-later-movies" className="starred-movies">
        <h6 className="header">Watch Later List</h6>
        <Movies movies={watchLater.watchLaterMovies} />
        <footer className="common-last-element">
          <button className="btn btn-primary" onClick={removeAll}>Remove All</button>
        </footer>
      </div>)}

      {!hasMovies && (<div className="common-last-element">
        <i className="bi bi-heart" />
        <p>You have no movies saved to watch later.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default WatchLater
