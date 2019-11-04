import {
  // SET_CITY,
  SET_COUNTRY,
  SET_IMAGE_URL,
  SET_PLACE_SELECTED,
  LOAD_DATA_LOCALSTORE,
  LOAD_DATA_EXTERNAL,
  RESET_PLACE_DATA,
  SAVE_LOCALSTORAGE_DONE,
  INITIALISE_PLACES,
  ADD_COORDINATES
} from "../actions/types";
const INITIAL_STATE_PLACES = {
  placesInLocalStore: [],
  currentExternalData: [],
  updateLocalStorage: undefined,
  coordinates: {}
};

export default (state = INITIAL_STATE_PLACES, action) => {
  switch (action.type) {
    // case SET_CITY:
    //   return { ...state, city_selected: action.payload };
    case SET_COUNTRY:
      return { ...state, country_selected: action.payload };
    case SET_PLACE_SELECTED:
      return { ...state, place_selected: action.payload };
    case SET_IMAGE_URL:
      return { ...state, image_url: action.payload };
    case INITIALISE_PLACES:
      return { ...state, placesInLocalStore: action.payload.keys };
    case RESET_PLACE_DATA:
      return { ...state, currentData: [] };

    case ADD_COORDINATES:
      let newcoordinates = state.coordinates;
      newcoordinates[action.payload.key] = action.payload.coordinates;
      console.log("List of coordinates in the system:")
      console.log(newcoordinates)
      return { ...state, coordinates: newcoordinates };
    case SAVE_LOCALSTORAGE_DONE:
      return { ...state, updateLocalStorage: undefined };
    case LOAD_DATA_EXTERNAL:
      console.log(action.payload.document);
      const newData = [...state.currentData, action.payload.document];
      console.log("New data record count =  " + newData.length);
      return {
        ...state,
        currentData: newData,
        updateLocalStorage: action.payload.localStorageKey
      };
    case LOAD_DATA_LOCALSTORE:
      if (action.payload.hasLocalData) {
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
