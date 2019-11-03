import {
  SET_CARDS_VISIBLE,
  SET_PLACES,
  SET_CITY,
  SET_COUNTRY,
  SET_PLACE_SELECTED,
  SET_IMAGE_URL,
  GET_COORDINATES,
  GET_PLACE_INFO,
  REFRESH_CARDS,
  REFRESH_DONE,
  DELETE_TRIP
} from "./types";

export const deleteTrip = trip => {
  return { type: DELETE_TRIP, payload: trip };
};
export const deleteDone = () => {
  return { type: DELETE_TRIP };
};

export const refreshCards = () => {
  return { type: REFRESH_CARDS };
};

export const refreshCardsDone = () => {
  return { type: REFRESH_DONE };
};

export const getCoordinates = (city, country) => {
  return { type: GET_COORDINATES, payload: [city, country] };
};
export const setPlaceInfo = mode => {
  return { type: GET_PLACE_INFO, payload: mode };
};

export const setCardsVisible = mode => {
  return { type: SET_CARDS_VISIBLE, payload: mode };
};

export const setMenuPlaces = places => {
  return { type: SET_PLACES, payload: places };
};

export const setPlaceSelected = place => {
  return { type: SET_PLACE_SELECTED, payload: place };
};

export const setCity = city => {
  return { type: SET_CITY, payload: city };
};

export const setCountry = country => {
  return { type: SET_COUNTRY, payload: country };
};

export const setImageUrl = imageUrl => {
  return { type: SET_IMAGE_URL, payload: imageUrl };
};
