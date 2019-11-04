import { combineReducers } from "redux";
import cardsReducer from "./cardsReducer";
import placesReducer from "./placesReducer";
import menuReducer from "./menuReducer";
import firebaseReducer from "./firebaseReducer";

export default combineReducers({
  firebase: firebaseReducer,
  cards: cardsReducer,
  places: placesReducer,
  menu: menuReducer
});
