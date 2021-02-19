import { AnnotationTypes } from "../types";

const initialState = {
  annotations: [],
  loading: false,
  err: null,
};

const AnnotationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AnnotationTypes.GET_ANNOTATION_REQUEST:
      return { ...state, loading: true, err: null, annotations: [] };
    case AnnotationTypes.GET_ANNOTATION_SUCCESS:
      return { ...state, annotations: action.data, loading: false };
    case AnnotationTypes.GET_ANNOTATION_ERROR:
      return { ...state, loading: false, err: null };
    case AnnotationTypes.ADD_ANNOTATION_REQUEST:
      return { ...state, loading: true, err: null };
    case AnnotationTypes.ADD_ANNOTATION_SUCCESS:
      return { ...state, annotations: action.data, loading: false };
    case AnnotationTypes.ADD_ANNOTATION_ERROR:
      return { ...state, loading: false, err: null };
    default:
      return state;
  }
};

export default AnnotationReducer;
