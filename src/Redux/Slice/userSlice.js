import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetail: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetail = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
