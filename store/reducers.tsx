import sharedReducer from "./shared/sharedSlice";
import cartReducer from "./cart/cartSlice";
import wishlistReducer from "./wishlist/wishlistSlice";

const rootReducers = {
  shared: sharedReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
};

export default rootReducers;
