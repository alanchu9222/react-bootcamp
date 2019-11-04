import {
  SET_CITY,
  SET_COUNTRY,
  SET_IMAGE_URL,
  SET_PLACE_SELECTED,
  LOAD_DATA_LOCALSTORE
} from "../actions/types";
const INITIAL_STATE_PLACES = { placesInLocalStore: [] };

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
    case LOAD_DATA_LOCALSTORE:
      if (action.payload.hasLocalData) {
        // alert("Reducer has local: "+action.payload.hasLocalData);
        // console.log(action.payload.localData);
        return { ...state, placesInLocalStore: action.payload.searchKey, currentData: action.payload.localData };
      }
      return state;
    default:
      return state;
  }
};
