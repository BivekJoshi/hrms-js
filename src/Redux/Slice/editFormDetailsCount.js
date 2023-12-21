import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 1,
};

const editFormCount = createSlice({
  name: "editDetailFormCount",
  initialState,
  reducers: {
    addCount(state) {
      state.count = state.count + 1;
    },
    removeCount(state) {
      state.count = state.count - 1;
    },
    setCount(state, action) {
      state.count = action.payload?.count;
    },
  },
});

export const { addCount, removeCount, setCount } = editFormCount.actions;
export default editFormCount.reducer;
