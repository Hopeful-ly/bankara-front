import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Tab =
  | "payments log"
  | "dashboard"
  | "wallets"
  | "settings"
  | "login";
interface TabState {
  currentTab: Tab;
}

const initialState: TabState = {
  currentTab: "dashboard",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    changeTab(state, action: PayloadAction<Tab>) {
      state.currentTab = action.payload;
    },
  },
});

export const { changeTab } = tabSlice.actions;
