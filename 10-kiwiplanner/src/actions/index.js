import tomtom from "../apis/tomtom";
import { TOMTOM_KEY } from "../apis/apikeys";
import {
  SET_CARDS_VISIBLE,
  SET_PLACES_MENU,
  SET_CITY,
  SET_COUNTRY,
  SET_PLACE_SELECTED,
  SET_IMAGE_URL,
  GET_COORDINATES,
  GET_PLACE_INFO,
  REFRESH_CARDS,
  REFRESH_DONE,
  DELETE_TRIP,
  LOAD_DATA_EXTERNAL,
  LOAD_DATA_LOCALSTORE
} from "./types";

// searchImage = async term => {
//   const response = await unsplash.get(
//     "https://api.unsplash.com/search/photos?per_page=1&order_by='popular'",
//     {
//       params: { query: term }
//     }
//   );

//   { "LOCAL ATTRACTIONS ": "attractions", city: this.state.city },
//   { "ACCOMODATIONS ": "hotel_motel", city: this.state.city },
//   { "FOOD ": "restaurant", city: this.state.city },
//   { "CAFE ": "cafe", city: this.state.city },
//   { "RECREATION ": "recreation", city: this.state.city }

export const loadDataExternal = (
  city,
  country,
  query,
  lat,
  lon
) => async dispatch => {
  alert("LOAD LOCATION DATA!");

  //   If the required data is found in local store, skip the API fetch
  // const testcity = "melbourne";
  // const testcountry = "australia";

  alert("Searching tom tom record!");
  const testquery = "cafe";
  const testlat = -37.81;
  const testlon = 144.96;
  console.log(
    `https://api.tomtom.com/search/2/search/${testquery}.json?key=${TOMTOM_KEY}&lon=${testlon}&lat=${testlat}`
  );

  const response = await tomtom.get(
    `/search/2/search/${testquery}.json?key=${TOMTOM_KEY}&lat=${testlat}&lon=${testlon}`
  );
  //    const response = await axios.get("https://api.tomtom.com/search/2/search/cafe.json?key=nWLvkbwKuylT208jAh7FEOR9JFAxzg0I&lon=144.96&lat=-37.81")
  console.log(response.data.results);
  alert("found tom tom record!");
  dispatch({ type: LOAD_DATA_EXTERNAL, payload: response.data.results });
};

// https://api.tomtom.com/search/2/search/cafe.json?key=nWLvkbwKuylT208jAh7FEOR9JFAxzg0I&lon=144.96&lat=-37.81

export const loadDataLocal = (city, country) => {
  let hasLocalData = false;
  let searchKey = city + "-" + country;
  let localData = false;

  let foundLocalRecord = JSON.parse(localStorage.getItem(searchKey));
  if (foundLocalRecord) {
    localData = foundLocalRecord;
    hasLocalData = true;
  } else {
    localData = [];
    hasLocalData = false;
  }

  const payload = {
    searchKey,
    hasLocalData,
    localData
  };
  return { type: LOAD_DATA_LOCALSTORE, payload: payload };
};

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

export const setPlacesMenu = places => {
  return { type: SET_PLACES_MENU, payload: places };
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

export const setPlaceImageUrl = imageUrl => {
  return { type: SET_IMAGE_URL, payload: imageUrl };
};
