import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initial state checks if `is_auth` cookie is set
const initialState = {
  isLoggedIn: !!Cookies.get('is_auth'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
