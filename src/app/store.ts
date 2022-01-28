import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@features/auth";
import { loginSlice } from "@features/login";
import { bankaraApi } from "@features/api";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [loginSlice.name]: loginSlice.reducer,
    [bankaraApi.reducerPath]: bankaraApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
