import { UserTypes } from "../types";

const initialState = {
  name: "",
  token: "",
  _id: "",
  expiry: "",
  loading: false,
  err: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTypes.GET_USER_REQUEST:
      return { ...state, loading: true, err: null };
    case UserTypes.GET_USER_SUCCESS:
      return {
        ...state,
        name: action.data.name,
        token: action.data.token,
        _id: action.data._id,
        expiry: action.data.expiry,
        loading: false,
      };
    case UserTypes.GET_USER_ERROR:
      return { ...state, loading: false, err: null };
    case UserTypes.SET_USER_INFO:
      return {
        ...state,
        name: action.payload.name,
        token: action.payload.token,
        _id: action.payload._id,
        expiry: action.payload.expiry,
        loading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
