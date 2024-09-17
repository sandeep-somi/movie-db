import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import moviesSlice from '../redux/movies-slice'
import starredSlice from '../redux/starred-slice'
import watchLaterSlice from '../redux/watch-later-slice'

const starredPersistConfig = {
    key: 'starred',
    storage,
}

const watchLaterPersistConfig = {
    key: 'watchLater',
    storage,
}

const persistedStarredReducer = persistReducer(starredPersistConfig, starredSlice.reducer)
const persistedWatchLaterReducer = persistReducer(watchLaterPersistConfig, watchLaterSlice.reducer)

const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        starred: persistedStarredReducer,
        watchLater: persistedWatchLaterReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            ignoredPaths: ['starred.register', 'watchLater.register'],
        },
    }),
})

const persistor = persistStore(store)

export { store, persistor }
