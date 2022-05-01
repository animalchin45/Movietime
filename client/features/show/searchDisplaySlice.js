import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchDisplay: ''
}

export const searchDisplaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        resetSearchDisplay: (state) => initialState,
        setSearchDisplay: (state, action) => {
            state.searchDisplay = action.payload
        }
    }
})

export const { resetSearchDisplay, setSearchDisplay } = searchDisplaySlice.actions
export default searchDisplaySlice.reducer