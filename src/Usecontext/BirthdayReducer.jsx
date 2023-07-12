export const initialState = {
  notification: null,
};

const BirthdayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "notifications":
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};

export default BirthdayReducer;
