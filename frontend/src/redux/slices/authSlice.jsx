import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Initial state checks if `is_auth` cookie is set
const initialState = {
  isLoggedIn: !!Cookies.get("is_auth"),
  user: {
    name: "",
    email: "",
    avatar: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => { // Accept action parameter
      state.isLoggedIn = true;
      state.user = {
        name: action.payload.displayName || action.payload.name, // Use displayName or name
        email: action.payload.email, // Use email for the user's email
        avatar: action.payload.picture, // Use the profile picture from Google
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {
        name: "",
        email: "",
        avatar: "", // Reset avatar on logout
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
