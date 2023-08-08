import { configureStore } from '@reduxjs/toolkit';
import birthdayReducer from '../Slice/birthdaySlice';
import eventReducer from '../Slice/eventSlice';
import holidayReducer from '../Slice/holidaySlice';

const store = configureStore({
  reducer: {
    birthday: birthdayReducer,
    event: eventReducer,
    holiday: holidayReducer,
  },
});

export default store;