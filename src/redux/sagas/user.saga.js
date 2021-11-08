import { put, call, takeLatest, all } from "redux-saga/effects";
import { Container } from "typedi";

import { UserTypes } from "../types";
import { UserService } from "../../services";

export function* getUser(action) {
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

export function* loginUser(action) {
  const userService = Container.get(UserService);
  const { email, password } = action.payload;
  try {
    const res = yield call(userService.loginUser, { email, password });

    console.log("this", res.data);

    if (res.data.error) {
      yield put({
        type: UserTypes.LOGIN_USER_ERROR,
        message: res.data.message,
      });
    } else {
      yield put({
        type: UserTypes.LOGIN_USER_SUCCESS,
        data: res.data.userInfo,
      });
    }
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: UserTypes.LOGIN_USER_ERROR, error });
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(UserTypes.GET_USER_REQUEST, getUser),
    takeLatest(UserTypes.LOGIN_USER_REQUEST, loginUser),
  ]);
}
