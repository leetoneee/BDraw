import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roomId: '',
    currentColor: 0,
    score: 0,
    scoreTable: [false, false, false, false, false, false],
    keywords: [],
    encodeImages: []
}

export const multiPlayerSlice = createSlice({
    name: 'multiPlayer',
    initialState: initialState,
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload;
        },
        setCurrentColor: (state, action) => {
            state.currentColor = action.payload;
        },
        setScoreTable: (state, action) => {
            state.scoreTable = action.payload;
        },
        setScore: (state, action) => {
            state.score = action.payload;
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

export const { setRoomId, setCurrentColor, setScore, setScoreTable, setKeywords, setEncodeImages, reset } = multiPlayerSlice.actions;

export default multiPlayerSlice.reducer;