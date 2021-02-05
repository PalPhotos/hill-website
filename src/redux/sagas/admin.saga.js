import { put, call, takeLatest, all } from "redux-saga/effects";
import { Container } from "typedi";

import { AdminTypes } from "../types";
import { AdminService } from "../../services";

export function* getLabel(action) {
  const adminService = Container.get(AdminService);
  const {} = action.payload;
  try {
    const res = yield call(adminService.getLabel);

    yield put({
      type: AdminTypes.GET_LABEL_SUCCESS,
      data: res.data.data,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_LABEL_ERROR, error });
  }
}

export function* addNewLabel(action) {
  const adminService = Container.get(AdminService);
  const { name } = action.payload;
  try {
    const resone = yield call(adminService.addNewLabel, {
      name,
    });

    const res = yield call(adminService.getLabel);

    yield put({
      type: AdminTypes.GET_LABEL_SUCCESS,
      data: res.data.data,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_LABEL_ERROR, error });
  }
}

export function* addNewLabelPic(action) {
  const adminService = Container.get(AdminService);
  const { name, url } = action.payload;
  try {
    const resone = yield call(adminService.addNewLabelPic, {
      name,
      url,
    });

    const res = yield call(adminService.getLabel);

    yield put({
      type: AdminTypes.GET_LABEL_SUCCESS,
      data: res.data.data,
    });
    yield put({
      type: AdminTypes.GET_PICTURE_SUCCESS,
      picture: resone.data.picture[0],
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_LABEL_ERROR, error });
  }
}

export function* addToCluster(action) {
  const adminService = Container.get(AdminService);
  const { values, labels } = action.payload;
  try {
    const resone = yield call(adminService.addToCluster, {
      values,
      label: labels[0],
    });

    const res = yield call(adminService.getLabelPicture, { labels });

    yield put({
      type: AdminTypes.GET_PICTURE_LABEL_SUCCESS,
      picture: res.data.userInfo,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_LABEL_ERROR, error });
  }
}

export function* getOnePicture(action) {
  const adminService = Container.get(AdminService);
  const { url } = action.payload;
  try {
    const res = yield call(adminService.getOnePicture, { url });

    yield put({
      type: AdminTypes.GET_PICTURE_SUCCESS,
      picture: res.data.userInfo[0],
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_PICTURE_ERROR, error });
  }
}

export function* getLabelPicture(action) {
  const adminService = Container.get(AdminService);
  const { labels } = action.payload;
  try {
    const res = yield call(adminService.getLabelPicture, { labels });

    yield put({
      type: AdminTypes.GET_PICTURE_LABEL_SUCCESS,
      picture: res.data.userInfo,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_PICTURE_LABEL_ERROR, error });
  }
}

export function* getPictureNotLabel(action) {
  const adminService = Container.get(AdminService);
  const { labels } = action.payload;
  try {
    const res = yield call(adminService.getPictureNotLabel, { labels });

    yield put({
      type: AdminTypes.GET_PICTURE_NOT_LABEL_SUCCESS,
      picture: res.data.userInfo,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_PICTURE_NOT_LABEL_ERROR, error });
  }
}

export function* getAllPicture(action) {
  const adminService = Container.get(AdminService);
  const {} = action.payload;
  try {
    const res = yield call(adminService.getAllPicture);

    yield put({
      type: AdminTypes.GET_ALL_PICTURE_SUCCESS,
      picture: res.data.userInfo,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_ALL_PICTURE_ERROR, error });
  }
}

export function* editLabelPicture(action) {
  const adminService = Container.get(AdminService);
  const { labels, url, label } = action.payload;
  try {
    const resone = yield call(adminService.editLabelPicture, { url, label });
    const res = yield call(adminService.getLabelPicture, { labels });

    yield put({
      type: AdminTypes.GET_PICTURE_LABEL_SUCCESS,
      picture: res.data.userInfo,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.GET_PICTURE_LABEL_ERROR, error });
  }
}

export function* addNewPicture(action) {
  const adminService = Container.get(AdminService);
  const { name, taken } = action.payload;
  try {
    const resone = yield call(adminService.addNewPicture, { name, taken });

    yield put({
      type: AdminTypes.ADD_PICTURE_SUCCESS,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AdminTypes.ADD_PICTURE_ERROR, error });
  }
}

export default function* adminSaga() {
  yield all([
    takeLatest(AdminTypes.GET_LABEL_REQUEST, getLabel),
    takeLatest(AdminTypes.ADD_LABEL_REQUEST, addNewLabel),
    takeLatest(AdminTypes.ADD_LABEL_PIC_REQUEST, addNewLabelPic),
    takeLatest(AdminTypes.GET_PICTURE_REQUEST, getOnePicture),
    takeLatest(AdminTypes.GET_PICTURE_LABEL_REQUEST, getLabelPicture),
    takeLatest(AdminTypes.EDIT_PICTURE_LABEL_REQUEST, editLabelPicture),
    takeLatest(AdminTypes.GET_ALL_PICTURE_REQUEST, getAllPicture),
    takeLatest(AdminTypes.ADD_PICTURE_REQUEST, addNewPicture),
    takeLatest(AdminTypes.GET_PICTURE_NOT_LABEL_REQUEST, getPictureNotLabel),
    takeLatest(AdminTypes.ADD_TO_CLUSTER_REQUEST, addToCluster),
  ]);
}
