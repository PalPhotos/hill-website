import { UserTypes } from "../types";

export const getUser = (id) => ({
  type: UserTypes.GET_USER_REQUEST,
  payload: { id },
});

export const setUser = (user) => ({
  type: UserTypes.SET_USER_INFO,
  payload: user,
});
