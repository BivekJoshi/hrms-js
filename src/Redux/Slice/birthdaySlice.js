import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  birthdays: [],
};

const birthdaySlice = createSlice({
  name: 'birthday',
  initialState,
  reducers: {
    addBirthday(state, action) {
      state.birthdays.push(action.payload);
    },
    removeBirthday(state, action) {
      state.birthdays = state.birthdays.filter(birthday => birthday.id !== action.payload.id);
    },
  },
});

export const { addBirthday, removeBirthday } = birthdaySlice.actions;
export default birthdaySlice.reducer;