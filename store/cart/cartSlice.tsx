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

interface CartState {
  products: productsType;
}

const initialState: CartState = {
  products: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<any>) => {
      if (state.products[action.payload.code]) {
        state.products[action.payload.code].quantity++;
      } else {
        state.products[action.payload.code] = { ...action.payload };
      }
    },
    decrementQuantity: (state, action: PayloadAction<any>) => {
      state.products[action.payload.code].quantity--;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProductToCart, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
