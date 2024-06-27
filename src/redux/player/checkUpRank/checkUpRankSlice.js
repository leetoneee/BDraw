import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
  isSuccess: '',
  message: '',
  error: '',
  isLoading: false,
  isError: false,
  checkRank: '',
}

export const playerCheckRank = createAsyncThunk(
  'player/playerCheckRank',
  async (playerId) => {
    let res = await axios.get(`/check/up-rank/${playerId}`)
    return res.data;
  }
)

export const checkRankSlice = createSlice({
  name: 'checkRank',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(playerCheckRank.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(playerCheckRank.fulfilled, (state, action) => {
        if (action.payload.errCode === 0) {
          state.isSuccess = true;
          state.checkRank = action.payload.checkRank;
        } else {
          state.isSuccess = false;
          state.error = action.payload.error;
        }
        state.message = action.payload.message
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(playerCheckRank.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message);
      })
  }
})

export const { reset } = checkRankSlice.actions

export default checkRankSlice.reducer


