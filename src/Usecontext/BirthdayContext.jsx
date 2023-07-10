import React, { createContext, useEffect, useReducer } from "react";
import { useGetTodayBirthday } from "../app/hooks/birthday/useBirthday";
import BirthdayReducer, { initialState } from "./BirthdayReducer";
export const RemoveNotificationContext = createContext();
export const 
BirthdayContext = ({ children }) => {
  const { data } = useGetTodayBirthday();
  const [notificationState, dispatch] = useReducer(
    BirthdayReducer,
    initialState
  );

  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: "notifications",
  //       payload: data,
  //     });

  //     dispatch({
  //       type: "notifications",
  //       payload: data?.length,
  //     });
  //   }
  // }, [data]);

  return (
    <div>
      <RemoveNotificationContext.Provider
        value={{ notificationState, dispatch }}
      >
        {children}
      </RemoveNotificationContext.Provider>
    </div>
  );
};
