// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
