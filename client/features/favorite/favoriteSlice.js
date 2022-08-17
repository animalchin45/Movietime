import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import favoriteService from "./favoriteService"

const initialState = {
  favorites: [],
  isError: false,
  isFavoritesSuccess: false,
  isFavoritesLoading: false,
  message: "",
}

// Create New Favorite
export const createFavorite = createAsyncThunk(
  "favorites/create",
  async (favoriteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.createFavorite(favoriteData, token)
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

// Get User Favorites
export const getFavorites = createAsyncThunk(
  "favorites/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.getFavorites(token)
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

// Upadte User Favorite
export const updateFavorite = createAsyncThunk(
  "favorites/update",
  async (update, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.updateFavorite(update, token)
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

// Delete User Favorite
export const deleteFavorite = createAsyncThunk(
  "favorites/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.deleteFavorite(id, token)
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

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoriteReset: (state) => initialState,
    favoriteClearError: (state) => {
      state.isError = false
      state.isFavoritesSuccess = false
      state.isFavoritesLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFavorite.pending, (state) => {
        state.isFavoritesLoading = true
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.isFavoritesLoading = false
        state.isFavoritesSuccess = true
        state.favorites.push(action.payload)
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.isFavoritesLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFavorites.pending, (state) => {
        state.isFavoritesLoading = true
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isFavoritesLoading = false
        state.isFavoritesSuccess = true
        state.favorites = action.payload
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isFavoritesLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.isFavoritesLoading = true
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isFavoritesLoading = false
        state.isFavoritesSuccess = true
        state.favorites = state.favorites.filter(
          (fav) => fav._id !== action.payload.id
        )
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.isFavoritesLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateFavorite.pending, (state) => {
        state.isFavoritesLoading = true
      })
      .addCase(updateFavorite.fulfilled, (state, action) => {
        state.isFavoritesLoading = false
        state.isFavoritesSuccess = true
        const foundIndex = state.favorites.findIndex(
          (x) => x._id == action.payload._id
        )
        state.favorites[foundIndex] = action.payload
      })
      .addCase(updateFavorite.rejected, (state, action) => {
        state.isFavoritesLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { favoriteReset, favoriteClearError } = favoriteSlice.actions
export default favoriteSlice.reducer
