import {
  SET_CITY,
  SET_COUNTRY,
  SET_IMAGE_URL,
  SET_PLACE_SELECTED,
  LOAD_DATA_LOCALSTORE,
  LOAD_DATA_EXTERNAL,
  RESET_PLACE_DATA,
  SAVE_LOCALSTORAGE_DONE,
  INITIALISE_PLACES
} from "../actions/types";
const INITIAL_STATE_PLACES = {
  placesInLocalStore: [],
  currentExternalData: [],
  updateLocalStorage: undefined
};

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
    case INITIALISE_PLACES:
      return { ...state, placesInLocalStore: action.payload.keys };
    case RESET_PLACE_DATA:
      return { ...state, currentData: [] };
    case SAVE_LOCALSTORAGE_DONE:
      return { ...state, updateLocalStorage: undefined };
    case LOAD_DATA_EXTERNAL:
      const newData = [...state.currentData, action.payload.document];
      console.log("New data record count =  " + newData.length);
      return {
        ...state,
        currentData: newData,
        updateLocalStorage: action.payload.localStorageKey
      };
    case LOAD_DATA_LOCALSTORE:
      if (action.payload.hasLocalData) {
        // alert("Reducer has local: "+action.payload.hasLocalData);
        return {
          ...state,
          placesInLocalStore: action.payload.keys,
          currentData: action.payload.localData
        };
      }
      return { ...state, placesInLocalStore: action.payload.keys };
    default:
      return state;
  }
};
