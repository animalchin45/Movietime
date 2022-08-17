import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

// Import Reducers
import authReducer from "./features/auth/authSlice"
import trendingReducer from "./features/show/trendingSlice"
import searchReducer from "./features/show/searchSlice"
import searchDisplayReducer from "./features/show/searchDisplaySlice"
import detailsReducer from "./features/show/detailsSlice"
import mediaViewerReducer from "./features/modal/mediaViewerSlice"
import favoriteReducer from "./features/favorite/favoriteSlice"
import recommendReduer from "./features/recommend/recommendSlice"

// Combine Reducers
const reducers = combineReducers({
  auth: authReducer,
  show: trendingReducer,
  search: searchReducer,
  display: searchDisplayReducer,
  details: detailsReducer,
  mediaViewer: mediaViewerReducer,
  favorites: favoriteReducer,
  recommend: recommendReduer,
})

// Configure Persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

// Initialize Persistant Reducer
const persistedReducer = persistReducer(persistConfig, reducers)

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store
