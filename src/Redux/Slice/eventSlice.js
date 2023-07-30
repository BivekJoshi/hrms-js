import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent(state, action) {
      state.events.push(action.payload);
    },
    removeEvent(state, action) {
      state.events = state.events.filter(event => event?.id !== action.payload?.id);
    },
  },
});

export const { addEvent, removeEvent } = eventSlice.actions;
export default eventSlice.reducer;