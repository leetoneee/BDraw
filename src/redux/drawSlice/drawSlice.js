import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentColor: 0,
    scoreTable: [false, false, false, false, false, false],
    keywords: [],
    encodeImages: []
}

export const drawSlice = createSlice({
    name: 'draw',
    initialState: initialState,
    reducers: {
        setCurrentColor: (state, action) => {
            state.currentColor = action.payload;
        },
        setScoreTable: (state, action) => {
            state.scoreTable = action.payload;
        },
        setKeywords: (state, action) => {
            state.keywords = action.payload;
        },
        setEncodeImages: (state, action) => {
            state.encodeImages = action.payload;
        },
        reset: () => initialState,
    },
});

export const { setCurrentColor, setScoreTable, setKeywords, setEncodeImages, reset } = drawSlice.actions;

export default drawSlice.reducer;