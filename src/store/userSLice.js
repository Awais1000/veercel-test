import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../component/servises/common";

const intialValue = getUser();
export const userSlice = createSlice({
  name: "user",
  initialState: { value: intialValue },
  reducers: {
    login: (state, action) => {
        state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;