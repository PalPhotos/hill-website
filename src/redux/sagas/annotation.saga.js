import { put, call, takeLatest, all } from "redux-saga/effects";
import { Container } from "typedi";

import { AnnotationTypes } from "../types";
import { AnnotationService } from "../../services";

export function* getAnnotation(action) {
  const annotationService = Container.get(AnnotationService);
  const { picture } = action.payload;
  try {
    const res = yield call(annotationService.getAnnotation, { picture });

    yield put({
      type: AnnotationTypes.GET_ANNOTATION_SUCCESS,
      data: res.data.data,
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AnnotationTypes.GET_ANNOTATION_ERROR, error });
  }
}

export function* addNewAnnotation(action) {
  const annotationService = Container.get(AnnotationService);
  const { picture, coords } = action.payload;
  try {
    const res = yield call(annotationService.addNewAnnotation, {
      picture,

      coords,
    });

    console.log("look", res.data);

    yield put({
      type: AnnotationTypes.GET_ANNOTATION_REQUEST,
      payload: { picture },
    });
  } catch (error) {
    console.log("Add items error ", error.response);
    yield put({ type: AnnotationTypes.ADD_ANNOTATION_ERROR, error });
  }
}

export default function* annotationSaga() {
  yield all([
    takeLatest(AnnotationTypes.GET_ANNOTATION_REQUEST, getAnnotation),
    takeLatest(AnnotationTypes.ADD_ANNOTATION_REQUEST, addNewAnnotation),
  ]);
}
