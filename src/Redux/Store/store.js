// import { configureStore } from "@reduxjs/toolkit";
// import { employDataReducer } from "../EmployDataSlice";

// const store = configureStore({
//   reducer: {
//     employData: employDataReducer,
//   },
//   // devTools: false,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
// export default store;

// store.js

import { configureStore } from '@reduxjs/toolkit';
import progressReducer from '../progressSlice';

const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});

export default store;