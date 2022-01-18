import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {}
interface AuthState {
  user?: User;
  loggedIn: boolean;
}

const initialState: AuthState = {
  user: {},
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;
