import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "../api/db";
interface AuthState {
  user: AuthUser | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
