import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentColor: 0,
    score: 0,
    encodeImages: []
}

export const drawSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        setCurrentColor: (state, action) => {
            state.currentColor = action.payload;
        },
        setScore: (state, action) => {
            state.score = action.payload;
        },
        setEncodeImages: (state, action) => {
            state.encodeImages = action.payload;
        },
        reset: () => initialState,
    },
});

export const { setCurrentColor, setScore, setEncodeImages, reset } = drawSlice.actions;

export default drawSlice.reducer;