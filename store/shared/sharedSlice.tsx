import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SharedState {
  mainCat: string;
  subCats: Array<any>;
}

const initialState: SharedState = {
  mainCat: "",
  subCats: [],
};

export const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    addMainCat: (state, action: PayloadAction<string>) => {
      state.mainCat = action.payload;
    },
    appendSubCat: (state, action) => {
      state.subCats.push(action.payload);
    },
    removeLastSubCat: (state) => {
      if (state.subCats.length === 1) {
        state.subCats = [];
      } else {
        state.subCats.pop();
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMainCat, appendSubCat, removeLastSubCat } =
  sharedSlice.actions;

export default sharedSlice.reducer;
