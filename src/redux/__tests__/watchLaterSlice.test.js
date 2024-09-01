import watchLaterSlice from '../watchLaterSlice'

const { addToWatchLater, removeFromWatchLater, remveAllWatchLater } = watchLaterSlice.actions

describe('watchLaterSlice', () => {
  it('should return the initial state', () => {
    const initialState = undefined
    const action = { type: 'unknown' }
    const state = watchLaterSlice.reducer(initialState, action)
    expect(state).toEqual({ watchLaterMovies: [] })
  })

  it('should handle addToWatchLater', () => {
    const initialState = { watchLaterMovies: [] }
    const newMovie = { id: 1, title: 'Inception' }
    const action = addToWatchLater(newMovie)
    const state = watchLaterSlice.reducer(initialState, action)
    expect(state.watchLaterMovies).toEqual([newMovie])
  })

  it('should handle removeFromWatchLater', () => {
    const initialState = { watchLaterMovies: [{ id: 1, title: 'Inception' }, { id: 2, title: 'The Matrix' }] }
    const action = removeFromWatchLater({ id: 1 })
    const state = watchLaterSlice.reducer(initialState, action)
    expect(state.watchLaterMovies).toEqual([{ id: 2, title: 'The Matrix' }])
  })

  it('should handle remveAllWatchLater', () => {
    const initialState = { watchLaterMovies: [{ id: 1, title: 'Inception' }] }
    const action = remveAllWatchLater()
    const state = watchLaterSlice.reducer(initialState, action)
    expect(state.watchLaterMovies).toEqual([])
  })
})
