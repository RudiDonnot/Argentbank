import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: null,
    firstName: null,
    lastName: null,
    userName: null,
    isLog: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLog = true;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.firstName = null;
      state.lastName = null;
      state.userName = null;
      state.isLog = false;
    },
  },
});

export const { setToken, setFirstName, setLastName, setUserName, logout } =
  loginSlice.actions;

export default loginSlice.reducer;
