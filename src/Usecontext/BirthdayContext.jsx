import { createContext } from "react";
export const RemoveNotificationContext = createContext();
export const TodayBirthday = ({}) => {
  const [notificationState, dispatchNotification] = useReducer(
    reducer,
    initialState
  );
};

return (
  <div>
    <RemoveNotificationContext.Provider value={dispatchNotification}>
      <SideBar />
    </RemoveNotificationContext.Provider>
  </div>
);
