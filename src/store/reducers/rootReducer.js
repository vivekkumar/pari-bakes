import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

// the key name will be the data property on the state object
