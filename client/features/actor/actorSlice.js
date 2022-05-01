import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import actorService from './actorService'

const initialState = {
    actorImages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// fetch actor details
export const actorImages = createAsyncThunk('actor/images', async (_, thunkAPI) => {
    try {
        return await actorService.images()
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

export const actorsSlice = createSlice({
    name: 'actors',
    initialState,
    reducers: {
        reset: {
            reset: (state) => initialState
        },
        extraReducers: (builder) => {
            builder
                .addCase(actorImages.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(actorImages.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.isError = false
                    state.message = ''
                    state.actorImages = action.payload
                })
                .addCase(actorImages.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })  
        }
    }
})

export const { reset } = actorsSlice.actions
export default actorsSlice.reducer