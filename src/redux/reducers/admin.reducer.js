import { UserActions } from "../actions";
import { AdminTypes } from "../types";

const initialState = {
  labels: [],
  pictures: [],
  picture: {},
  allPictures: [],
  allButPics: [],
  thePicsForLabellinbg: {},
  selectedIndexes: {},
  isPicEnd: false,
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
      return { ...state, loading: true, err: null, allPictures: [] };
    case AdminTypes.GET_ALL_PICTURE_REQUEST_NEXT:
      return { ...state, loading: true, err: null };
    case AdminTypes.GET_ALL_PICTURE_SUCCESS:
      let tempArray = {};
      let keys = Object.keys(state.allPictures);
      if (keys.length > 0) {
        tempArray = { ...state.allPictures, ...action.picture };
      } else {
        tempArray = action.picture;
      }

      return {
        ...state,
        allPictures: tempArray,
        loading: false,
        isPicEnd: action.isEnd,
      };
    case AdminTypes.GET_ALL_PICTURE_ERROR:
      return { ...state, loading: false, err: null };
    case AdminTypes.GET_PICTURE_LABEL_REQUEST:
      return { ...state, loading: true, err: null, pictures: [] };
    case AdminTypes.GET_PICTURE_LABEL_SUCCESS:
      return {
        ...state,
        pictures: action.picture,
        loading: false,
        labels: action.labels,
      };
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
    case AdminTypes.ADD_PICTURE_DRIVE_REQUEST:
      return { ...state, loading: true, err: null };
    case AdminTypes.CLEAR_PICS:
      return { ...state, pictures: [], allButPics: [], labels: [] };

    case AdminTypes.SET_SELECTED_INDEXES:
      return { ...state, selectedIndexes: action.payload };

    case AdminTypes.UPDATE_PICTURE_FOR_LABELLING:
      return { ...state, thePicsForLabellinbg: action.payload };

    case AdminTypes.GET_PICTURE_FOR_LABELLING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case AdminTypes.GET_PICTURE_FOR_LABELLING_SUCCESS:
      return {
        ...state,
        thePicsForLabellinbg: action.data,
        selectedIndexes: {},
        loading: false,
      };

    case AdminTypes.EDIT_PICTURE_LABEL_REQUEST:
      return { ...state, loading: true, err: null };
    case AdminTypes.ADD_TO_CLUSTER_REQUEST:
      return { ...state, loading: true, err: null };
    default:
      return state;
  }
};

export default AdminReducer;
