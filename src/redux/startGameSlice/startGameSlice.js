import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isGameStarted: false,
}

export const startGameSlice = createSlice({
    name: 'startGame',
    initialState: initialState,
    reducers: {
        setIsGameStarted: (state, action) => {
            state.isGameStarted = action.payload;
        },
        reset: () => initialState,
    },
});

export const { setIsGameStarted, reset } = startGameSlice.actions;

export default startGameSlice.reducer;