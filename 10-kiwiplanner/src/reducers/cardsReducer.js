import {
  SET_CARDS_VISIBLE,
  REFRESH_CARDS,
  REFRESH_DONE,
  DELETE_TRIP,
  DELETE_DONE
} from "../actions/types";
const INITIAL_STATE_CARDS = {
  cardsVisible: true
};

export default (state = INITIAL_STATE_CARDS, action) => {
  switch (action.type) {
    case SET_CARDS_VISIBLE:
      return { ...state, cardsVisible: action.payload };
    case REFRESH_CARDS:
      return { ...state, isRefreshed: false };
    case REFRESH_DONE:
      return { ...state, isRefreshed: true };
    case DELETE_TRIP:
      return { ...state, tripToDelete: action.payload };
    case DELETE_DONE:
      return { ...state, tripToDelete: undefined };

    default:
      return state;
  }
};
