import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import showService from "./showService"

const initialState = {
  searchResults: [],
  search: {
    term: "",
    type: "movie",
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Search Shows
export const searchShows = createAsyncThunk(
  "show/search",
  async (searchTerm, thunkAPI) => {
    try {
      return await showService.search(searchTerm)
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

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset: (state) => initialState,
    setSearch: (state, action) => {
      state.search = { ...state.search, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchShows.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchShows.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = ""
        state.searchResults = action.payload
      })
      .addCase(searchShows.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, setSearch } = searchSlice.actions
export default searchSlice.reducer
