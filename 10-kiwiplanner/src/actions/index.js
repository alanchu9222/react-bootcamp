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
  LOAD_DATA_LOCALSTORE,
  SAVE_LOCALSTORAGE_DONE,
  INITIALISE_PLACES,
  RESET_PLACE_DATA
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

const searchCriteria = [
  { title: "LOCAL ATTRACTIONS", searchKey: "attractions" },
  { title: "ACCOMODATIONS", searchKey: "hotel_motel" },
  { title: "FOOD", searchKey: "restaurants" },
  { title: "CAFE", searchKey: "cafe" },
  { title: "RECREATION", searchKey: "recreation" }
];
export const loadDataExternal = (city, country, lat, lon) => async dispatch => {
  //   If the required data is found in local store, skip the API fetch
  // const testcity = "melbourne";
  // const testcountry = "australia";

  //  alert("Searching tom tom record!");
  // const testlat = -37.81;
  // const testlon = 144.96;
  // console.log(
  //   `https://api.tomtom.com/search/2/search/${testquery}.json?key=${TOMTOM_KEY}&lon=${testlon}&lat=${testlat}`
  // );
  // console.log(
  //   `https://api.tomtom.com/search/2/search/${testquery}.json?key=${TOMTOM_KEY}&lon=${lon}&lat=${lat}`
  // );
  dispatch({ type: RESET_PLACE_DATA });
  const responses = [];
  searchCriteria.forEach(async crit => {
    const response = await tomtom.get(
      `/search/2/search/${crit.searchKey}.json?key=${TOMTOM_KEY}&lat=${lat}&lon=${lon}`
    );
    //    alert("found tom tom record for "+crit.searchKey);
    //    responses.push(response.data.results);
    //    console.log("Here are the responses "+[...responses]);

    console.log("Filtering data --------------------------");

    let content = [];
    // Filter the contents - to extract only name, phone number and url
    response.data.results.forEach(item => {
      let url = "";
      let phone = "";

      console.log("POI Object");
      console.log(item.poi);
      // console.log(Object.keys(item.poi));
      // console.log("Item Object");
      // console.log(item);
      // console.log(Object.keys(item.poi));

      //if (item.poi.url) {
      try {
        url =
          item.poi.url.substring(0, 4) === "http"
            ? item.poi.url
            : "http://" + item.poi.url;
      } catch {
        url = "";
      }
      try {
        phone = item.poi.phone;
      } catch (err) {
        phone = "";
      }
      try {
        const myitem = {
          name: item.poi.name,
          phone: phone,
          url: url
        };
        content.push(myitem);
      } catch (err) {
        console.log(err.message);
      }
    });
    const document = {
      title: crit.title + "-" + city,
      content: content
    };
    const payload = {
      document: document,
      localStorageKey: city + "-" + country
    };
    dispatch({ type: LOAD_DATA_EXTERNAL, payload: payload });
  });

  // const response = await tomtom.get(
  //   `/search/2/search/${testquery}.json?key=${TOMTOM_KEY}&lat=${lat}&lon=${lon}`
  // );
  //    const response = await axios.get("https://api.tomtom.com/search/2/search/cafe.json?key=nWLvkbwKuylT208jAh7FEOR9JFAxzg0I&lon=144.96&lat=-37.81")
  //  console.log(response.data.results);
  //  alert("found tom tom record!");
  //  dispatch({ type: LOAD_DATA_EXTERNAL });
};

// https://api.tomtom.com/search/2/search/cafe.json?key=nWLvkbwKuylT208jAh7FEOR9JFAxzg0I&lon=144.96&lat=-37.81

export const placesInitialise = () => {
  let keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
  }
  const payload = {
    keys
  };
  return { type: INITIALISE_PLACES, payload: payload };
};

export const saveDataLocalStorage = (key, placeData) => {
  localStorage.setItem(key, JSON.stringify(placeData));
  return { type: SAVE_LOCALSTORAGE_DONE };
};

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
  let keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
  }
  const payload = {
    keys,
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
