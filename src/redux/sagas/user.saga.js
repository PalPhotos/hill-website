import { put, call, takeLatest, all } from "redux-saga/effects";
import { Container } from "typedi";

import { UserTypes } from "../types";
import { UserService } from "../../services";

export function* getLabel(action) {
  const userService = Container.get(UserService);
  const { id } = action.payload;
  try {
    const res = yield call(userService.getUser, { _id: id });

    yield put({
      type: UserTypes.GET_USER_SUCCESS,
      data: res.data.user,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: UserTypes.GET_USER_ERROR, error });
  }
}

export default function* userSaga() {
  yield all([takeLatest(UserTypes.GET_USER_REQUEST, getLabel)]);
}
