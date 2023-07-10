// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { axiosInstance } from "../auth/axiosInterceptor";

// export const getEmployData = createAsyncThunk(
//   "/admin/employee/",
//   async (pageNumber, thunkAPI) => {
//     const res = await axiosInstance.get(`/employee/page-wise?pageNumber=0&pageSize=10&sortBy=id&sortDir=asc`);
//     return res;
//   }
// );


// export const employDataSlice = createSlice({
//   name: "employData",
//   initialState: {},

//   reducers: {},
//   extraReducers: {
//     [getEmployData.fulfilled]: (state, { payload }) => {
//       state.employData = payload;
//     },
//   },
// });

// export const employDataReducer = employDataSlice.reducer;
// export const {} = employDataSlice.actions;
