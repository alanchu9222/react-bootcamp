import { SET_PLACES } from "../actions/types";
const INITIAL_STATE_MENU = {};

export default (state = INITIAL_STATE_MENU, action) => {
  switch (action.type) {
    case SET_PLACES:
      return { ...state, places: action.payload };
    default:
      return state;
  }
};
