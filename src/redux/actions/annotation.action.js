import { AnnotationTypes } from "../types";

export const addNewAnnotation = (picture, coords) => ({
  type: AnnotationTypes.ADD_ANNOTATION_REQUEST,
  payload: { picture, coords },
});

export const getAnnotation = (picture) => ({
  type: AnnotationTypes.GET_ANNOTATION_REQUEST,
  payload: { picture },
});
