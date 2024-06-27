import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
  isSuccess: '',
  message: '',
  error: '',
  isLoading: false,
  isError: false,
  userHistory: '',
}

export const playerHistory = createAsyncThunk(
  'player/playerHistory',
  async (playerId) => {
    let res = await axios.get(`/player/history/${playerId}`)
    return res.data;
  }
)

export const playerHistorySlice = createSlice({
  name: 'playerHistory',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(playerHistory.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(playerHistory.fulfilled, (state, action) => {
        if (action.payload.errCode === 0) {
          state.isSuccess = true;
          state.userHistory = action.payload.history;
        } else {
          state.isSuccess = false;
          state.error = action.payload.error;
        }
        state.message = action.payload.message
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(playerHistory.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message);
      })
  }
})

export const { reset } = playerHistorySlice.actions

export default playerHistorySlice.reducer


