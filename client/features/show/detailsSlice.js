import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import showService from './showService'

const initialState = {
    details: {},
    tvContent: [],
    posters: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Fetch Show Details
export const showDetails = createAsyncThunk('show/details', async (show, thunkAPI) => {
    try {
        return await showService.details(show)
    } catch (error) {
        const message = (
            error.response && 
            error.response.data && 
            error.response.data.message
        ) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Fetch Tv Content Ratings
export const tvRatings = createAsyncThunk('show/tvRatings', async (show, thunkAPI) => {
    try {
        return await showService.tvContentRatings(show)
    } catch (error) {
        const message = (
            error.response && 
            error.response.data && 
            error.response.data.message
        ) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Fetch Tv and movie posters
export const getPosters = createAsyncThunk('show/posters', async (show, thunkAPI) => {
    try {
        return await showService.posters(show)
    } catch (error) {
        const message = (
            error.response && 
            error.response.data && 
            error.response.data.message
        ) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(showDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(showDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = ''
                state.details = action.payload
            })
            .addCase(showDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(tvRatings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(tvRatings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = ''
                state.tvContent = action.payload
            })
            .addCase(tvRatings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPosters.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosters.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.message = ''
                state.posters = action.payload
            })
            .addCase(getPosters.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = detailsSlice.actions
export default detailsSlice.reducer