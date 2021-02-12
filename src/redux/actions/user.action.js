import { UserTypes } from "../types";

export const getUser = (id) => ({
  type: UserTypes.GET_USER_REQUEST,
  payload: { id },
});
