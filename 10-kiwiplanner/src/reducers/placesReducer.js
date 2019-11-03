import {
  SET_CITY,
  SET_COUNTRY,
  SET_IMAGE_URL,
  SET_PLACE_SELECTED
} from "../actions/types";
const INITIAL_STATE_PLACES = {};

export default (state = INITIAL_STATE_PLACES, action) => {
  switch (action.type) {
    case SET_CITY:
      return { ...state, city: action.payload };
    case SET_COUNTRY:
      return { ...state, country: action.payload };
    case SET_PLACE_SELECTED:
      return { ...state, place_selected: action.payload };
    case SET_IMAGE_URL:
      return { ...state, image_url: action.payload };
    default:
      return state;
  }
};
