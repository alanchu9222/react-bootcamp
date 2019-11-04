import { INITIALISE_FIREBASE, SET_IS_LOGGED_IN } from "../actions/types";
const INITIAL_STATE_MENU = {};

export default (state = INITIAL_STATE_MENU, action) => {
  switch (action.type) {
    case INITIALISE_FIREBASE:
      return { ...state, db: action.payload.db, auth: action.payload.auth };
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
      return;
    default:
      return state;
  }
};
