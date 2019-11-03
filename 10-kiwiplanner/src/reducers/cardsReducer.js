import { SET_CARDS_VISIBLE } from "../actions/types";
const INITIAL_STATE_CARDS = {
  cardsVisible: true
};

export default (state = INITIAL_STATE_CARDS, action) => {
  switch (action.type) {
    case SET_CARDS_VISIBLE:
      return { ...state, cardsVisible: action.payload };
    default:
      return state;
  }
};
