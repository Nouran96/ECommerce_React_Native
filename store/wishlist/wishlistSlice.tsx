import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type productsType = {
  [key: string]: {
    quantity: number;
    code: string;
    images?: Array<{ url: string }>;
    name: string;
    price: { value: number };
    selectedSize: string;
    selectedColor: string;
  };
};

interface WishlistState {
  products: productsType;
}

const initialState: WishlistState = {
  products: {},
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleProductFromWishlist: (state, action: PayloadAction<any>) => {
      if (state.products[action.payload.code]) {
        delete state.products[action.payload.code];
      } else {
        state.products[action.payload.code] = { ...action.payload };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleProductFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
