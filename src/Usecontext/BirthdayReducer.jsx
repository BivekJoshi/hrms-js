export const initialState = {
  notification: null,
};

const BirthdayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "notifications":
      console.log(action?.payload);
      return {
        ...state,
        notification: action.payload,
      };
    default:
      return state;
  }
};

export default BirthdayReducer;
