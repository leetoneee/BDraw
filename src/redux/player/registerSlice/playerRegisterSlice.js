import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
  isSuccess: '',
  message: '',
  error: '',
  isLoading: false,
  isError: false,
  player: '',
}

export const createProfilePlayer = createAsyncThunk(
  'player/createProfilePlayer',
  async (requestOptions) => {
    let res = await axios.post('/register', requestOptions)
    return res.data;
  }
)

export const playerRegisterSlice = createSlice({
  name: 'playerRegister',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfilePlayer.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createProfilePlayer.fulfilled, (state, action) => {
        if (action.payload.errCode === 0) {
          state.isSuccess = true;
          state.player = action.payload.player;
        } else {
          state.isSuccess = false;
          state.error = action.payload.error;
        }
        state.message = action.payload.message
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(createProfilePlayer.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        console.log(action.error.message);
      })
  }
})

export const { reset } = playerRegisterSlice.actions

export default playerRegisterSlice.reducer


