import { combineReducers, Reducer } from "redux";
import AdminReducer from "./admin.reducer";
import UserReducer from "./user.reducer";

const allReducers = {
  admin: AdminReducer,
  user: UserReducer,
};

const rootReducer = combineReducers({ ...allReducers });

export default rootReducer;
