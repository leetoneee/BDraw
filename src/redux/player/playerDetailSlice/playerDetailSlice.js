import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
  isSuccess: '',
  message: '',
  error: '',
  isLoading: false,
  isError: false,
  userDetail: '',
}

export const playerDetail = createAsyncThunk(
  'player/playerDetail',
  async (playerId) => {
    let res = await axios.get(`/player/detail/${playerId}`)
    return res.data;
  }
)

export const playerDetailSlice = createSlice({
  name: 'playerDetail',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(playerDetail.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(playerDetail.fulfilled, (state, action) => {
        if (action.payload.errCode === 0) {
          state.isSuccess = true;
          state.userDetail = action.payload.player;
        } else {
          state.isSuccess = false;
          state.error = action.payload.error;
        }
        state.message = action.payload.message
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(playerDetail.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message);
      })
  }
})

export const { reset } = playerDetailSlice.actions

export default playerDetailSlice.reducer


