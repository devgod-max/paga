import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import dashboardReducer from "./dashboard/dashboardReducer";
import checkoutReducer from "./checkout/checkoutReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
