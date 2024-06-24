import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
  isSuccess: '',
  message: '',
  error: '',
  isLoading: false,
  isError: false,
  user: '',
}

export const loginPlayer = createAsyncThunk(
  'player/loginPlayer',
  async (requestOptions) => {
    let res = await axios.post('/login', requestOptions)
    return res.data;
  }
)

export const playerLoginSlice = createSlice({
  name: 'playerLogin',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPlayer.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginPlayer.fulfilled, (state, action) => {
        if (action.payload.errCode === 0) {
          state.isSuccess = true;
          state.user = action.payload.user;
        } else {
          state.isSuccess = false;
          state.error = action.payload.error;
        }
        state.message = action.payload.message
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(loginPlayer.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message);
      })
  }
})

export const { setUser, reset } = playerLoginSlice.actions

export default playerLoginSlice.reducer


