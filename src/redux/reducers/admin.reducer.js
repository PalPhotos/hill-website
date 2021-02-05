import { AdminTypes } from "../types";

const initialState = {
  labels: [],
  pictures: [],
  picture: {},
  allPictures: [],
  allButPics: [],
  loading: false,
  err: null,
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case AdminTypes.GET_LABEL_REQUEST:
      return { ...state, loading: true, err: null, labels: [] };
    case AdminTypes.GET_LABEL_SUCCESS:
      return { ...state, labels: action.data, loading: false };
    case AdminTypes.GET_LABEL_ERROR:
      return { ...state, loading: false, err: null };
    case AdminTypes.ADD_LABEL_REQUEST:
      return { ...state, loading: true, err: null };
    case AdminTypes.ADD_LABEL_SUCCESS:
      return { ...state, labels: action.payload, loading: false };
    case AdminTypes.ADD_LABEL_ERROR:
      return { ...state, loading: false, err: null };

    case AdminTypes.GET_PICTURE_REQUEST:
      return { ...state, loading: true, err: null, picture: {} };
    case AdminTypes.GET_PICTURE_SUCCESS:
      return { ...state, picture: action.picture, loading: false };
    case AdminTypes.GET_PICTURE_ERROR:
      return { ...state, loading: false, err: null };
    case AdminTypes.GET_ALL_PICTURE_REQUEST:
      return { ...state, loading: true, err: null, picture: {} };
    case AdminTypes.GET_ALL_PICTURE_SUCCESS:
      return { ...state, allPictures: action.picture, loading: false };
    case AdminTypes.GET_ALL_PICTURE_ERROR:
      return { ...state, loading: false, err: null };
    case AdminTypes.GET_PICTURE_LABEL_REQUEST:
      return { ...state, loading: true, err: null, pictures: [] };
    case AdminTypes.GET_PICTURE_LABEL_SUCCESS:
      return { ...state, pictures: action.picture, loading: false };
    case AdminTypes.GET_PICTURE_LABEL_ERROR:
      return { ...state, loading: false, err: null };
    case AdminTypes.GET_PICTURE_NOT_LABEL_REQUEST:
      return { ...state, loading: true, err: null, allButPics: [] };
    case AdminTypes.GET_PICTURE_NOT_LABEL_SUCCESS:
      return { ...state, allButPics: action.picture, loading: false };
    case AdminTypes.GET_PICTURE_NOT_LABEL_ERROR:
      return { ...state, loading: false, err: null };
    case AdminTypes.SET_ALL_BUT_PICS:
      return { ...state, allButPics: action.payload, loading: false };

    case AdminTypes.EDIT_PICTURE_LABEL_REQUEST:
      return { ...state, loading: true, err: null };
    case AdminTypes.ADD_TO_CLUSTER_REQUEST:
      return { ...state, loading: true, err: null };
    default:
      return state;
  }
};

export default AdminReducer;
