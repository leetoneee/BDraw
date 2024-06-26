import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
  isSuccess: '',
  message: '',
  error: '',
  isLoading: false,
  isError: false,
  userDetail: '',
  noneData: true,
}

export const playerDetailByUsername = createAsyncThunk(
  'player/playerDetailByUsername',
  async (username) => {
    let res = await axios.get(`/player/info/${username}`)
    return res.data;
  }
)

export const playerDetailByUsernameSlice = createSlice({
  name: 'playerDetailByUsername',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(playerDetailByUsername.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(playerDetailByUsername.fulfilled, (state, action) => {
        if (action.payload.player) {
          state.isSuccess = true;
          state.userDetail = action.payload.player;
          state.noneData = false;
        } else {
          console.log('fulfilled else')
          state.isSuccess = false;
          noneData = true;
          state.error = action.payload.error;
        }
        state.message = action.payload.message
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(playerDetailByUsername.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
      })
  }
})

export const { reset } = playerDetailByUsernameSlice.actions

export default playerDetailByUsernameSlice.reducer


