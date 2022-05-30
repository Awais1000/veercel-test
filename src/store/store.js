import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSLice";
import cartReducer from "./cartSlice";
import cartDisplayReducer from "./cartDisplay";
import totalReducer from "./totalSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart : cartReducer,
    cartDisplay : cartDisplayReducer,
    total : totalReducer,
  }
});























// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSLice";
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }
// const persistedReducer = persistReducer(persistConfig, userReducer)


// export const store = configureStore({
//   reducer: { user : persistedReducer},
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })