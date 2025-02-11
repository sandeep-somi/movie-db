import starredSlice from '../starred-slice'

const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions

describe('starredSlice', () => {
  it('should return the initial state', () => {
    const initialState = undefined
    const action = { type: 'unknown' }
    const state = starredSlice.reducer(initialState, action)
    expect(state).toEqual({ starredMovies: [], ids: [] })
  })

  it('should handle starMovie', () => {
    const initialState = { starredMovies: [], ids: [] }
    const newMovie = { id: 1, title: 'Inception' }
    const action = starMovie(newMovie)
    const state = starredSlice.reducer(initialState, action)
    expect(state.starredMovies).toEqual([newMovie])
  })

  it('should handle unstarMovie', () => {
    const initialState = { starredMovies: [{ id: 1, title: 'Inception' }, { id: 2, title: 'The Matrix' }], ids: [1, 2] }
    const action = unstarMovie({ id: 1 })
    const state = starredSlice.reducer(initialState, action)
    expect(state.starredMovies).toEqual([{ id: 2, title: 'The Matrix' }])
  })

  it('should handle clearAllStarred', () => {
    const initialState = { starredMovies: [{ id: 1, title: 'Inception' }] }
    const action = clearAllStarred()
    const state = starredSlice.reducer(initialState, action)
    expect(state.starredMovies).toEqual([])
  })
})
