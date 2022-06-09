import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quantity: 0,
    position: 0,
    isOpen: false,
    selectedMedia: ''
}

export const mediaViewerSlice = createSlice({
    name: 'mediaViewer',
    initialState,
    reducers: {
        mediaViewerReset: (state) => initialState,
        setPosition: (state, action) => {
            state.position = action.payload
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload
        },
        setOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setSelectedMedia: (state, action) => {
            state.selectedMedia = action.payload
        },
        changePosition: (state, action) => {
            state.position = action.payload
        }
    }
})

export const { mediaViewerReset, setPosition, setQuantity, setOpen, setSelectedMedia, changePosition } = mediaViewerSlice.actions
export default mediaViewerSlice.reducer