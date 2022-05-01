import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import trendingReducer from './features/show/trendingSlice'
import searchReducer from './features/show/searchSlice'
import searchDisplayReducer from './features/show/searchDisplaySlice'
import detailsReducer from './features/show/detailsSlice'
import mediaViewerReducer from './features/modal/mediaViewerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    show: trendingReducer,
    search: searchReducer,
    display: searchDisplayReducer,
    details: detailsReducer,
    mediaViewer: mediaViewerReducer
  },
})