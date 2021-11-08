import { UserTypes } from "../types";

export const getUser = (id) => ({
  type: UserTypes.GET_USER_REQUEST,
  payload: { id },
});

export const loginUser = (email, password) => ({
  type: UserTypes.LOGIN_USER_REQUEST,
  payload: { email, password },
});

export const setUser = (user) => ({
  type: UserTypes.SET_USER_INFO,
  payload: user,
});

export const resetUser = () => ({
  type: UserTypes.RESET_USER_INFO,
  payload: {},
});
