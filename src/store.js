import { configureStore } from '@reduxjs/toolkit';
import birthdayReducer from './Redux/Slice/birthdaySlice';
import eventReducer from './Redux/Slice/eventSlice';
import holidayReducer from './Redux/Slice/holidaySlice';

const store = configureStore({
  reducer: {
    birthday: birthdayReducer,
    event: eventReducer,
    holiday: holidayReducer,
  },
});

export default store;