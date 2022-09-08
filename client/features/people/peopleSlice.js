import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import peopleService from './peopleService'

const initialState = {
  peopleDetails: {},
  peopleImages: [],
  peopleShows: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// fetch people details
export const peopleDetails = createAsyncThunk(
  'people/details',
  async (personId, thunkAPI) => {
    try {
      return await peopleService.peopleDetails(personId)
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

// fetch extra people images
export const peopleImages = createAsyncThunk(
  'people/images',
  async (personId, thunkAPI) => {
    try {
      return await peopleService.peopleImages(personId)
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

// fetch people shows
export const peopleShows = createAsyncThunk(
  'people/shows',
  async (personId, thunkAPI) => {
    try {
      return await peopleService.peopleShows(personId)
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

export const peoplesSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(peopleDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(peopleDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = ''
        state.peopleDetails = action.payload
      })
      .addCase(peopleDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(peopleImages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(peopleImages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = ''
        state.peopleImages = action.payload
      })
      .addCase(peopleImages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(peopleShows.pending, (state) => {
        state.isLoading = true
      })
      .addCase(peopleShows.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = ''
        state.peopleShows = action.payload
      })
      .addCase(peopleShows.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = peoplesSlice.actions
export default peoplesSlice.reducer
