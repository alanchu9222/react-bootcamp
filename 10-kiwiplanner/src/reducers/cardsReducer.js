import {
  SET_CARDS_VISIBLE,
  SET_TRIP_ID,
  REFRESH_CARDS_BUSY,
  REFRESH_CARDS_DONE,
  DELETE_TRIP,
  DELETE_DONE,
  UPDATE_TRIP,
  UPDATE_DONE
} from "../actions/types";
const INITIAL_STATE_CARDS = {
  cardsVisible: true,
  tripData: [],
  trip_id_selected: ""
};

export default (state = INITIAL_STATE_CARDS, action) => {
  switch (action.type) {
    case SET_CARDS_VISIBLE:
      return { ...state, cardsVisible: action.payload };
    case SET_TRIP_ID:
      return { ...state, trip_id_selected: action.payload };
    case REFRESH_CARDS_DONE:
      return {
        ...state,
        tripData: action.payload.tripData,
        selectedId: action.payload.selectedId,
        refreshCardsBusy: false
      };

    case REFRESH_CARDS_BUSY:
      return { ...state, refreshCardsBusy: true };
    case DELETE_TRIP:
      return { ...state, tripToDelete: action.payload };
    case DELETE_DONE:
      return { ...state, tripToDelete: undefined };
    case UPDATE_TRIP:
      return { ...state, tripToUpdate: action.payload };
    case UPDATE_DONE:
      return { ...state, tripToUpdate: undefined };

    default:
      return state;
  }
};
