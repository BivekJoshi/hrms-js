const initialState = { notification: null };
export const reducer = (state = initialState, action) => {
  switch (action) {
    case "removenotification":
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
};
