import { combineReducers, Reducer } from "redux";
import AdminReducer from "./admin.reducer";
import UserReducer from "./user.reducer";
import AnnotationReducer from "./annotation.reducer";

const allReducers = {
  admin: AdminReducer,
  user: UserReducer,
  annotation: AnnotationReducer,
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;
