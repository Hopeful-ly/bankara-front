import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@features/auth";
import { tabSlice } from "@features/tab";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [tabSlice.name]: tabSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
