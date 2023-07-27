import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  holidays: [],
  todayHoliday: false,
};

const holidaySlice = createSlice({
  name: 'holiday',
  initialState,
  reducers: {
    addHoliday(state, action) {
      state.holidays = action.payload;
    },
    setTodayHoliday(state, action) {
      state.todayHoliday = action.payload;
    },
  },
});

export const { addHoliday, setTodayHoliday } = holidaySlice.actions;
export default holidaySlice.reducer;