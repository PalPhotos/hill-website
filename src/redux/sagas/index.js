import { all, fork } from "redux-saga/effects";

// Sagas
import adminSaga from "./admin.saga";
import userSaga from "./user.saga";
import annotationSaga from "./annotation.saga";

// Connect types to sagas
export const rootSaga = function* root() {
  yield all([fork(adminSaga), fork(userSaga), fork(annotationSaga)]);
};
