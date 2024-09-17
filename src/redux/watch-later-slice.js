import { createSlice } from "@reduxjs/toolkit"

const watchLaterSlice = createSlice({
    name: 'watch-later',
    initialState: {
        watchLaterMovies: [],
        ids: [],
    },
    reducers: {
        addToWatchLater: (state, action) => {
            state.watchLaterMovies = [action.payload, ...state.watchLaterMovies]
            state.ids.push(action.payload.id)
        },
        removeFromWatchLater: (state, action) => {
            const indexOfId = state.watchLaterMovies.findIndex(key => key.id === action.payload.id)
            state.watchLaterMovies.splice(indexOfId, 1)
            const indexOfIds = state.ids.indexOf(action.payload.id)
            state.ids.splice(indexOfIds, 1)
        },
        remveAllWatchLater: (state) => {
            state.watchLaterMovies = []
            state.ids = []
        },
    },
})

export default watchLaterSlice
