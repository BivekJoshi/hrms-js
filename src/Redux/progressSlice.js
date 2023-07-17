import { createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
  name: 'progress',
  initialState: null,
  reducers: {
    setProgressId: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProgressId } = progressSlice.actions;

export default progressSlice.reducer;