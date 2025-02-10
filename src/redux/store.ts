import { configureStore, Store } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import moviesSlice from './movies-slice'
import starredSlice from './starred-slice'
import watchLaterSlice from './watch-later-slice'
import { TRootStore } from "./types"

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

const store: Store<TRootStore> = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        starred: persistedStarredReducer,
        watchLater: persistedWatchLaterReducer,
    }
})

const persistor = persistStore(store)

export { store, persistor }
