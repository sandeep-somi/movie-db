import { createSlice } from "@reduxjs/toolkit"

const starredSlice = createSlice({
    name: 'starred',
    initialState: {
        starredMovies: [],
        ids: [],
    },
    reducers: {
        starMovie: (state, action) => {
            state.starredMovies = [action.payload, ...state.starredMovies]
            state.ids.push(action.payload.id)
        },
        unstarMovie: (state, action) => {
            const indexOfId = state.starredMovies.findIndex(key => key.id === action.payload.id)
            state.starredMovies.splice(indexOfId, 1)
            const indexOfIds = state.ids.indexOf(action.payload.id)
            state.ids.splice(indexOfIds, 1)
        },
        clearAllStarred: (state) => {
            state.starredMovies = []
            state.ids = []
        },
    },
})

export default starredSlice
