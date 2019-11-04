import tomtom from "../apis/tomtom";
import { TOMTOM_KEY } from "../apis/apikeys";
import locationiq from "../apis/geolocation";
import { LOCATIONIQ_KEY } from "../apis/apikeys";
// import app from "firebase/app";
// import { DB_CONFIG } from "../config/config";

import "firebase/auth";
import "firebase/firestore";

import {
  SET_IS_LOGGED_IN,
  SET_CARDS_VISIBLE,
  SET_PLACES_MENU,
  SET_TRIP_ID,
  SET_COUNTRY,
  SET_PLACE_SELECTED,
  SET_IMAGE_URL,
  GET_PLACE_INFO,
  REFRESH_CARDS_BUSY,
  REFRESH_CARDS_DONE,
  DELETE_TRIP,
  DELETE_DONE,
  UPDATE_TRIP,
  UPDATE_DONE,
  LOAD_DATA_EXTERNAL,
  LOAD_DATA_LOCALSTORE,
  SAVE_LOCALSTORAGE_DONE,
  INITIALISE_PLACES,
  RESET_PLACE_DATA,
  RESET_COORDINATES,
  ADD_COORDINATES,
  INITIALISE_FIREBASE
} from "./types";

// ACDEBUG - this process sends multiple location-iq requests out
//  The responses come back to the coordinates record (in the reducer)
//  The responses also - gets updated to the database
//  The U_updates module can detect change of coordinates data with componentdidupdate
//  (but there is no need for that)
// export const updateCoordinates = (locationList, country) => async dispatch => {
//   // Clear the coordinates buffer - Because it is declared as an ASYNC function
//   // Multiple dispatch calls can be made without blocking the code
//   console.log("list of locations");
//   console.log(locationList);

//   dispatch({ type: RESET_COORDINATES });
//   // Reload the coordinates - for each location/coountry pair on the list
//   //dispatch({ type: REFRESH_COORDINATES, payload: payload });

//   locationList.forEach(async location => {
//     if (location.trim().length > 0) {
//       // var delay = 1000; // 1 second delay
//       // var now = new Date();
//       // var desiredTime = new Date().setMilliseconds(now.getSeconds() + delay);

//       // while (now < desiredTime) {
//       //   now = new Date(); // update the current time
//       // }
//       // console.log("Delay ... 1 secs");

//       console.log("Processing location:" + location);
//       try {
//         const resp = await locationiq.get(
//           `${LOCATIONIQ_KEY}&q=${location}%20${country}&format=json`
//         );
//         const payload = {
//           key: `${location}-${country}`,
//           coordinates: {
//             latitude: resp.data[0].lat,
//             longitude: resp.data[0].lon
//           }
//         };
//         dispatch({ type: ADD_COORDINATES, payload: payload });
//       } catch (err) {
//         console.log(err.message);
//       }
//     }
//   });
// };

export const refreshCards = (db, trip_id_selected) => async dispatch => {
  // FOr asyn function, its ok to dispatch multiiple messages
  // the dispatch operations are non-blocking
  console.log("reloading trip data");
  const snapshot = await db.collection("trips").get();
  let tripData = [];
  let selectedId = trip_id_selected;
  dispatch({ type: REFRESH_CARDS_BUSY });
  try {
    const data = snapshot.docs;
    if (data.length) {
      data.forEach(doc => {
        const trip = doc.data();
        let tripRecord = {
          id: doc.id,
          city: trip.city,
          country: trip.country,
          temperature: trip.temperature,
          weather: trip.weather,
          weatherIcon: trip.weatherIcon,
          dateStart: trip.dateStart.seconds,
          dateEnd: trip.dateEnd.seconds,
          place1: trip.place1,
          place2: trip.place2,
          place3: trip.place3,
          place4: trip.place4,
          imageUrl: trip.imageUrl
        };
        tripData.push(tripRecord);
      });

      // Check that the current selected city still exists in the database
      // (maybe it just got deleted)
      const selectedCityFound = tripData.find(
        trip => trip.id === trip_id_selected
      );
      if (!selectedCityFound) {
        // Assign another selected city
        selectedId = "";
      }
      // Simulate user selection of the first card in the deck
      //this.handleCardClick(tripArray[0].city);
    }

    const payload = {
      tripData,
      selectedId
    };
    console.log("saving trip data");
    dispatch({ type: REFRESH_CARDS_DONE, payload: payload });
  } catch (err) {
    console.log(err.message);
  }
};

// this.props.db
//   .collection("trips")
//   .get()
//   .then(
//     snapshot => {
//       const data = snapshot.docs;
//       if (data.length) {
//         let tripDates = [];
//         let tripArray = [];
//         data.forEach(doc => {
//           const trip = doc.data();
//           let tripRecord = {
//             id: doc.id,
//             city: trip.city,
//             country: trip.country,
//             temperature: trip.temperature,
//             weather: trip.weather,
//             weatherIcon: trip.weatherIcon,
//             dateStart: trip.dateStart.seconds,
//             dateEnd: trip.dateEnd.seconds,
//             place1: trip.place1,
//             place2: trip.place2,
//             place3: trip.place3,
//             place4: trip.place4,
//             imageUrl: trip.imageUrl,
//             coordinates: trip.coordinates
//             // lat: trip.lat,
//             // lon: trip.lon
//           };
//           tripDates.push({
//             start: this.dateObject(trip.dateStart.seconds),
//             end: this.dateObject(trip.dateEnd.seconds)
//           });
//           this.props.setTripDates(tripDates);
//           tripArray.push(tripRecord);
//         });

//         this.setState({ travelPlan: tripArray });
//         this.setState({ cardsUpdated: true });

//         this.props.refreshCardsDone();

//         // Check that the current selected city still exists in the database
//         // (maybe it just got deleted)
//         let city_record = obj => {
//           return (
//             obj.City === this.state.city && obj.Country === this.state.country
//           );
//         };
//         const selectedCityFound = tripArray.find(city_record);
//         if (!selectedCityFound) {
//           // Assign another selected city
//           this.setState({
//             city: tripArray[0].city,
//             country: tripArray[0].country
//           });
//           // Simulate user selection of the first card in the deck
//           //this.handleCardClick(tripArray[0].city);
//         }
//       } else {
//         console.log("No records found");
//       }
//     },
//     err => console.log(err.message)
//   );

const searchCriteria = [
  { title: "LOCAL ATTRACTIONS", searchKey: "attractions" },
  { title: "ACCOMODATIONS", searchKey: "hotel_motel" },
  { title: "FOOD", searchKey: "restaurants" },
  { title: "CAFE", searchKey: "cafe" },
  { title: "RECREATION", searchKey: "recreation" }
];
export const loadDataExternal = (location, country) => async dispatch => {
  // Clear the data buffer - Because it is declared as an ASYNC function
  // Multiple dispatch calls can be made without blocking the code
  // Get Coordinates
  let coordinates = {};
  let coordinatesFound = false;
  console.log("Loading external data for :" + location + "-" + country);
  try {
    const resp = await locationiq.get(
      `${LOCATIONIQ_KEY}&q=${location}%20${country}&format=json`
    );
    coordinates = {
      key: `${location}-${country}`,
      coordinates: {
        latitude: resp.data[0].lat,
        longitude: resp.data[0].lon
      }
    };
    console.log("Coordinates found for :" + location + "-" + country);

    coordinatesFound = true;
    dispatch({ type: ADD_COORDINATES, payload: coordinates });
  } catch (err) {
    console.log(err.message);
  }
  if (!coordinatesFound) {
    return;
  }
  dispatch({ type: RESET_PLACE_DATA });

  // Reload the data buffer - for each search criteria
  searchCriteria.forEach(async crit => {
    console.log(
      "Searching data:" + crit.searchKey + "-" + location + "-" + country
    );
    const lat = coordinates.coordinates.latitude;
    const lon = coordinates.coordinates.longitude;
    const response = await tomtom.get(
      `/search/2/search/${crit.searchKey}.json?key=${TOMTOM_KEY}&lat=${lat}&lon=${lon}`
    );
    let content = [];
    console.log(
      "Found data:" + crit.searchKey + "-" + location + "-" + country
    );

    response.data.results.forEach(item => {
      let url = "";
      let phone = "";
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
      title: crit.title + "-" + location,
      content: content
    };

    const payload = {
      document: document,
      localStorageKey: location + "-" + country
    };
    dispatch({ type: LOAD_DATA_EXTERNAL, payload: payload });
  });
};

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
    console.log("Found local data for " + city + "-" + country);
    localData = foundLocalRecord;
    hasLocalData = true;
  } else {
    console.log("Local data NOT found for " + city + "-" + country);
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

export const setIsLoggedIn = bool => {
  return { type: SET_IS_LOGGED_IN, payload: bool };
};

export const deleteTrip = trip => {
  return { type: DELETE_TRIP, payload: trip };
};

export const deleteDone = () => {
  return { type: DELETE_DONE };
};

export const updateTrip = trip => {
  return { type: UPDATE_TRIP, payload: trip };
};
export const updateDone = () => {
  return { type: UPDATE_DONE };
};

//export const refreshCards = () => {
//  return { type: REFRESH_CARDS };
//};

export const refreshCardsDone = () => {
  return { type: REFRESH_CARDS_DONE };
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

export const setTripId = id => {
  return { type: SET_TRIP_ID, payload: id };
};

// export const setCity = city => {
//   return { type: SET_CITY, payload: city };
// };

export const setCountry = country => {
  return { type: SET_COUNTRY, payload: country };
};

export const setPlaceImageUrl = imageUrl => {
  return { type: SET_IMAGE_URL, payload: imageUrl };
};

export const initialiseFirebase = (db, auth) => {
  //  app.initializeApp(DB_CONFIG);
  const payload = {
    db: db,
    auth: auth
  };
  return { type: INITIALISE_FIREBASE, payload: payload };
};

// export const initialiseAuth = app => {
//   const auth = app.auth();
//   return { type: INITIALISE_AUTH, payload: auth };
// };

// export const initialiseDb = app => {
//   const db = app.firestore();
//   return { type: INITIALISE_DB, payload: db };
// };
