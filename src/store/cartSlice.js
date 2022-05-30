import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../component/servises/common";

const intialValue = getCart();
export const cartSlice = createSlice({
  name: "cart",
  initialState: { value: intialValue },
  reducers: {
    addToCart: (state, action) => {
      if (Object.entries(action.payload).length === 0) {
        state.value = action.payload;
      } else {
        if (state.value.length === 0) {
          state.value = [...state.value, action.payload];
          localStorage.setItem('Cart', JSON.stringify(state.value));
        } else {
          let result = true;
          state.value.map((item) => {
            if (item.id === action.payload.id) {
              result = false;
            }
          })
          if (result) {
            state.value = [...state.value, action.payload];
            localStorage.setItem('Cart', JSON.stringify(state.value));
          }
        }
      }
    }
  }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;