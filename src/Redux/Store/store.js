import { configureStore } from "@reduxjs/toolkit";
import birthdayReducer from "../Slice/birthdaySlice";
import eventReducer from "../Slice/eventSlice";
import holidayReducer from "../Slice/holidaySlice";
import userReducer from "../Slice/userSlice";
import editFormDetailsCount from "../Slice/editFormDetailsCount";

const store = configureStore({
  reducer: {
    birthday: birthdayReducer,
    event: eventReducer,
    holiday: holidayReducer,
    user: userReducer,
    employeEditForm: editFormDetailsCount,
  },
});

export default store;
