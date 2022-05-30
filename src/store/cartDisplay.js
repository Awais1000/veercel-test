import { createSlice } from "@reduxjs/toolkit";

const intialValue = false;
export const cartDisplaySlice = createSlice({
  name: "cartDisplay",
  initialState: { value: intialValue },
  reducers: {
    showCart: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { showCart } = cartDisplaySlice.actions;
export default cartDisplaySlice.reducer;