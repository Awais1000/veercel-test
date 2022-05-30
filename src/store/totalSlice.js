import { createSlice } from "@reduxjs/toolkit";

const intialValue = 0;
export const totalSlice = createSlice({
  name: "total",
  initialState: { value: intialValue },
  reducers: {
    cartTotal: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const {cartTotal} = totalSlice.actions;
export default totalSlice.reducer;