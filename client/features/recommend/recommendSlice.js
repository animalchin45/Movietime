import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recommendService from './recommendService'

const initialState = {
  recommendResults: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Recommend Shows
export const recommendShows = createAsyncThunk(
  'show/recommend',
  async (recommend, thunkAPI) => {
    try {
      return await recommendService.recommendations(recommend)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const recommendSeed = (favorites) => {
  // Determine Recommendation Seed
  const seed = Math.floor(Math.random() * favorites.length)

  // Set Recommendation Seed
  const show = favorites[seed]

  // Determine Show Type
  let showType

  if (show.release_date) {
    showType = 'movie'
  } else if (show.first_air_date) {
    showType = 'tv'
  }
  // Return show type and seed id
  return {
    id: show.id,
    showType,
  }
}

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(recommendShows.pending, (state) => {
        state.isLoading = true
      })
      .addCase(recommendShows.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = ''
        state.recommendResults = action.payload
      })
      .addCase(recommendShows.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = recommendSlice.actions
export default recommendSlice.reducer
