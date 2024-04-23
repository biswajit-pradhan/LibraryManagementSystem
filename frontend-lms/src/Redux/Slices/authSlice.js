// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken: "",
  username: "",
  roles: "",
  isLoggedIn: "false",
  jwtTokenValidity: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { jwtToken, username, roles, isLoggedIn, jwtTokenValidity } =
        action.payload;
      state.jwtToken = jwtToken;
      state.username = username;
      state.roles = roles;
      state.isLoggedIn = isLoggedIn;
      state.jwtTokenValidity = jwtTokenValidity;
    },
    logout(state) {
      state.jwtToken = "";
      state.username = "";
      state.roles = "";
      state.isLoggedIn = "false";
      state.jwtTokenValidity = 0;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
