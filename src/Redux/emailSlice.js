// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { axiosInstance } from "../auth/axiosInterceptor"; 
// import { getEmployData } from "./employDataSlice";

// export const emailToAll = createAsyncThunk(
//   "/employee/send-email/employee-list/",
//   async ( values, {dispatch }) => {
//     const res = await axiosInstance.post(`/employee/send-email/employee-list`, values);
//     dispatch(getEmployData());
//     return res;
//   }
// );

// export const emailSlice = createSlice({
//   name: "employData",
//   initialState: {},

//   reducers: {},
//   extraReducers: {
//     [emailToAll.fulfilled]: (state, { payload }) => {
//       state.employData = payload;
//     },
//   },
// });

// export const emailReducer = emailSlice.reducer;
// export const {} = emailSlice.actions;



