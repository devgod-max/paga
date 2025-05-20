import {
  SET_PAYMENT_METHOD,
  SET_PAYMENT_DETAILS,
  RESET_CHECKOUT,
} from "./checkoutTypes";

const initialState = {
  method: null, // e.g. "crypto", "credit", "bank"
  details: {}, // e.g. coin, amount, card info, etc.
  status: "idle",
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_METHOD:
      return { ...state, method: action.payload };

    case SET_PAYMENT_DETAILS:
      return { ...state, details: { ...state.details, ...action.payload } };

    case RESET_CHECKOUT:
      return initialState;

    default:
      return state;
  }
};

export default checkoutReducer;
