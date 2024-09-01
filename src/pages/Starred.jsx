import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../redux/starredSlice'
import './starred.scss'
import Movies from '../components/movies'

const Starred = () => {
  const { starredMovies } = useSelector((state) => state.starred)
  const { clearAllStarred } = starredSlice.actions
  const dispatch = useDispatch()
  const hasMovies = !!starredMovies.length;

  return (
    <div className="starred" data-testid="starred">
      {hasMovies && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <Movies movies={starredMovies} />
        <footer className="common-last-element">
          <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>Remove All</button>
        </footer>
      </div>)}

      {!hasMovies && (<div className="common-last-element">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default Starred
