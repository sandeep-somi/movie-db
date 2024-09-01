import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMoviesAPI, discoverMoviesAPI } from "../apis"

export const fetchMovies = createAsyncThunk('fetch-movies', async ({ page, query }) => {
    if (query) {
        const movies = await getMoviesAPI({ page, query })
        return movies
    }

    const movies = await discoverMoviesAPI({ page })
    return movies
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        page: 0,
        hasMore: false,
        loading: false,
    },
    reducers: {
        resetMovies: (state) => {
            state.movies = []
            state.page = 0
            state.hasMore = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            if (action.payload.page === 1) {
                state.movies = action.payload.results
            } else {
                state.movies = [...state.movies, ...action.payload.results]
            }
            state.page = action.payload.page
            state.hasMore = action.payload.results.length > 0
            state.loading = false
        })
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMovies.rejected, (state) => {
            state.loading = false
        })
    }
})

export const { resetMovies } = moviesSlice.actions

export default moviesSlice