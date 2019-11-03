import { combineReducers } from "redux";
import cardsReducer from "./cardsReducer";
import placesReducer from "./placesReducer";
import menuReducer from "./menuReducer";

export default combineReducers({
  cards: cardsReducer,
  places: placesReducer,
  menu: menuReducer
});
