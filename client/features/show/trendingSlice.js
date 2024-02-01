import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import showService from './showService';

const initialState = {
  trendingResults: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Fetch Trending Shows
export const trendingShows = createAsyncThunk(
  'show/trending',
  async (_, thunkAPI) => {
    try {
      return await showService.trending();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(trendingShows.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trendingShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = '';
        state.trendingResults = action.payload;
      })
      .addCase(trendingShows.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = trendingSlice.actions;
export default trendingSlice.reducer;
