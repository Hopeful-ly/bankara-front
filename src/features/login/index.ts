import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {}
type PageType = "signup" | "signin";
interface LoginState {
  name: string;
  email: string;
  password: string;
  page: PageType;
}

const initialState: LoginState = {
  name: "",
  email: "",
  password: "",
  page: "signup",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    SetName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    SetEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    SetPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    SetPage(state, action: PayloadAction<PageType>) {
      state.page = action.payload;
    },
    ResetLogin(state) {
      state.email = "";
      state.name = "";
      state.password = "";
    },
  },
});

export const { SetEmail, SetName, SetPage, SetPassword, ResetLogin } =
  loginSlice.actions;
