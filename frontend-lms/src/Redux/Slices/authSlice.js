// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken: "",
  username: "",
  roles: "",
  isLoggedIn: "false",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { jwtToken, username, roles, isLoggedIn } = action.payload;
      state.jwtToken = jwtToken;
      state.username = username;
      state.roles = roles;
      state.isLoggedIn = isLoggedIn;
    },
    logout(state) {
      state.jwtToken = "";
      state.username = "";
      state.roles = "";
      state.isLoggedIn = "false";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
