import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../services/axios'

const initialState = {
  isSuccess: '',
  message: '',
  error: '',
  isLoading: false,
  isError: false,
  listItem: '',
}

export const getAllItem = createAsyncThunk(
  'item/getAllItem',
  async (playerId) => {
    let res = await axios.get(`/item/get-all/${playerId}`)
    return res.data;
  }
)

export const getAllItemSlice = createSlice({
  name: 'getAllItem',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllItem.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllItem.fulfilled, (state, action) => {
        if (action.payload.errCode === 0) {
          state.isSuccess = true;
          state.listItem = action.payload.listItem;
        } else {
          state.isSuccess = false;
          state.error = action.payload.error;
        }
        state.message = action.payload.message
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllItem.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
      })
  }
})

export const { reset } = getAllItemSlice.actions

export default getAllItemSlice.reducer


