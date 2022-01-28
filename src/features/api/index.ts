import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { AuthUser, Card, CardCreate, UserCreate } from "./db";
import { get, set } from "js-cookie";

const axiosBase = axios.create({ baseURL: "http://localhost:4000/" });
const axiosBaseQuery: BaseQueryFn<
  AxiosRequestConfig<any>,
  unknown,
  unknown
> = async (config) => {
  try {
    const OldSessionId = get().bsid || "";
    console.log("Old Session ID!", OldSessionId);
    const result = await axiosBase({
      ...config,
      headers: { ...(config.headers || {}), "x-session-id": OldSessionId },
    });
    console.log("Headers", result.headers);
    const sessionId = result.headers["x-session-id"];
    console.log("Session ID!", sessionId);
    if (sessionId) {
      set("bsid", sessionId, { path: "/" });
    }
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};

export const bankaraApi = createApi({
  reducerPath: "bankaraApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    logInUser: builder.query<LoginUserResponse, LoginUserArgs>({
      query: (data) => ({
        url: "login",
        method: "post",
        data: data,
      }),
    }),
    createUser: builder.query<CreateUserResponse, CreateUserArgs>({
      query: (data) => ({
        url: "users",
        method: "post",
        data: data,
      }),
    }),
    deleteUser: builder.query<DeleteUserResponse, DeleteUserArgs>({
      query: ({ user_id }) => ({
        url: "users/" + user_id,
        method: "delete",
      }),
    }),
    getUser: builder.query<GetUserResponse, GetUserArgs>({
      query: ({ user_id }) => ({
        url: "users/" + user_id,
        method: "get",
      }),
    }),
    getUserCard: builder.query<GetUserCardResponse, GetUserCardArgs>({
      query: ({ user_id, card_id }) => ({
        url: `users/${user_id}/cards/${card_id}`,
        method: "get",
      }),
    }),
    createUserCard: builder.query<CreateUserCardResponse, CreateUserCardArgs>({
      query: ({ user_id, ...data }) => ({
        url: `users/${user_id}/cards`,
        method: "post",
        data: data,
      }),
    }),
    getUserCards: builder.query<GetUserCardsResponse, GetUserCardsArgs>({
      query: ({ user_id }) => ({
        url: `users/${user_id}/cards`,
        method: "get",
      }),
    }),
    checkUser: builder.query<LoginUserResponse, any>({
      query: () => ({
        url: `check`,
        method: "get",
      }),
    }),
    logOutUser: builder.query<LogOutUserResponse, LogOutUserArgs>({
      query: ({}) => ({
        url: `logout`,
        method: "get",
      }),
    }),
  }),
});

export const {
  // normal hooks
  useCreateUserCardQuery,
  useCreateUserQuery,
  useDeleteUserQuery,
  useGetUserCardQuery,
  useGetUserCardsQuery,
  useGetUserQuery,
  useLogInUserQuery,
  // lazy hooks
  useLazyCreateUserCardQuery,
  useLazyCreateUserQuery,
  useLazyDeleteUserQuery,
  useLazyGetUserCardQuery,
  useLazyGetUserCardsQuery,
  useLazyGetUserQuery,
  useLazyLogInUserQuery,
  // prefetch
  usePrefetch,
} = bankaraApi;

export interface ResponseBase {
  status: boolean;
  msg?: string;
}

export interface LogOutUserResponse extends ResponseBase {}
export interface LogOutUserArgs {}
export interface GetUserCardsResponse extends ResponseBase {
  cards: {
    title: string;
    provider: string;
    balance: number;
    card_number: number;
    name: string;
    id: number;
  }[];
}
export interface GetUserCardsArgs {
  user_id: number;
}

export interface CreateUserCardResponse extends ResponseBase {
  card: Card;
}
export interface CreateUserCardArgs extends CardCreate {
  user_id: number;
}

export interface GetUserCardResponse extends ResponseBase {
  card: Card;
}
export interface GetUserCardArgs {
  user_id: number;
  card_id: number;
}

export interface GetUserResponse extends ResponseBase {
  user: AuthUser;
}
export interface GetUserArgs {
  user_id: number;
}

export interface DeleteUserResponse extends ResponseBase {}
export interface DeleteUserArgs {
  user_id: number;
}

export interface LoginUserResponse extends ResponseBase {
  user: AuthUser;
}
export interface LoginUserArgs {
  email: string;
  password: string;
}

export interface CreateUserResponse extends ResponseBase {
  user: AuthUser;
}
export interface CreateUserArgs extends UserCreate {}
