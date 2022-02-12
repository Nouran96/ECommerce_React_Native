import sharedReducer from "./shared/sharedSlice";
import cartReducer from "./cart/cartSlice";

const rootReducers = {
  shared: sharedReducer,
  cart: cartReducer,
};

export default rootReducers;
