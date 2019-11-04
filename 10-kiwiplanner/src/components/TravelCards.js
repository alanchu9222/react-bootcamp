import { connect } from "react-redux";
import {
  setCardsVisible,
  setTripId,
  // setCity,
  setCountry,
  setPlacesMenu,
  setPlaceSelected,
  setPlaceImageUrl,
  refreshCardsDone,
  loadDataLocal,
  loadDataExternal,
  updateTrip,
  deleteTrip,
  refreshCards
} from "../actions";

import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./TravelCards.css";

class TravelCards extends Component {
  state = {
    city: "",
    country: "",
    cardsUpdated: false
    //travelPlan: []
  };
  stripYear = date => {
    const temp = date.split(" ");
    return temp[0] + " " + temp[1];
  };
  updateCards = () => {
    // Cards not updated will trigger a re-render of the cards
    this.setState({ cardsUpdated: false });
  };
  // User selects a card

  // ACDEBUG - RESUME WORK HERE
  handleCardClick = (city, docId) => {
    const places = [];
    places.push(city);
    const destRecord = this.props.cards.tripData.find(doc => {
      return doc.id === docId;
    });

    console.log("Record acquired for " + city);
    console.log(destRecord.coordinates);

    /*
    (1) Set menu options
    (2) Reload the data
    (3) Render the reloaded data
    */
    this.props.setTripId(docId);
    // this.props.setCity(city);
    this.props.setCountry(destRecord.country);
    if (destRecord) {
      // If the field exist then push it into the MenuOptions
      destRecord.place1 && places.push(destRecord.place1);
      destRecord.place2 && places.push(destRecord.place2);
      destRecord.place3 && places.push(destRecord.place3);
      destRecord.place4 && places.push(destRecord.place4);
    }
    this.props.setPlacesMenu(places);
    this.props.setPlaceImageUrl(destRecord.imageUrl);
    this.props.setCardsVisible(false);
    this.setState({ city: city, country: destRecord.country });
    this.props.setPlaceSelected(city);
    this.props.loadDataLocal(city, destRecord.country);
    // console.log(
    //   "Places in data storage:" + this.props.places.placesInLocalStore
    // );
    const searchKey = city + "-" + destRecord.country;
    /* Check that the city has local data - if none then load from external API */

    /* Must load coordinates before loading records */
    if (!this.props.places.placesInLocalStore.includes(searchKey)) {
      const key = city + "-" + destRecord.country;
      this.props.loadDataExternal(city, destRecord.country);
    }
  };
  handleCardDelete = docId => {
    //    const temp = [];
    //    temp.push(city);
    //    const destRecord = this.state.travelPlan.find(record => {
    const destRecord = this.props.cards.tripData.find(record => {
      return record.id === docId;
    });
    if (destRecord) {
      // If the field exist then push it into the MenuOptions
      //this.props.performDelete(destRecord);
      this.props.deleteTrip(destRecord);
    }
  };
  handleCardEdit = docId => {
    // const temp = [];
    // temp.push(city);
    //    const destRecord = this.state.travelPlan.find(record => {
    const destRecord = this.props.cards.tripData.find(record => {
      return record.id === docId;
    });
    if (destRecord) {
      // If the field exist then push it into the MenuOptions
      //this.props.performUpdate(destRecord);
      this.props.setTripId(docId);
      this.props.updateTrip(destRecord);
    }
  };
  dateObject = dateSeconds => {
    // Date is stored in mongo as unix timestamp
    // provide time in milliseconds as input argument to create Date Object
    return new Date(dateSeconds * 1000);
  };
  // componentDidMount() {
  //   this.props.refreshCards(
  //     this.props.firebase.db,
  //     this.props.cards.trip_id_selected
  //   );
  // }
  componentDidUpdate(prevProps) {
    // Detects the state for database and auth
    if (prevProps.firebase !== this.props.firebase) {
      this.props.refreshCards(
        this.props.firebase.db,
        this.props.cards.trip_id_selected
      );
    }
    if (prevProps.places.coordinates !== this.props.places.coordinates) {
      console.log("Coordinates have changed");
      console.log("Trip id : " + this.props.cards.trip_id_selected);
      console.log(prevProps.places.coordinates);
      console.log(this.props.places.coordinates);
      this.props.firebase.db
        .collection("trips")
        .doc("coordinates-document")
        .update({
          coordinates: this.props.places.coordinates
        });
    }
  }

  // This gets called when the cards have been updated (delete or update events)
  // componentDidUpdate(prevProps) {
  //   if (prevProps.cards.isRefreshed !== this.props.cards.isRefreshed) {
  //     this.setState({ cardsUpdated: false });
  //   }

  //   if (this.props.user) {
  //     if (!this.state.cardsUpdated) {
  //       // ACDEBUG
  //       // Load all documents from database
  //       // We want the doc ID of the selected one
  //       // Remove the tripdate feature
  //       // - The rendering of trip cards will depend on DocumentID instead of city name
  //       // Will use document ID for the following use cases
  //       // (1) Navbar place selected.
  //       // Document ID is used to get a record: the lat long information
  //       // is used for loading external data - the loaded data triggers rerendering of the
  //       // Travel plan
  //       // (2) Rendering of trip cards is based on the store, and includes document ID
  //       // The document ID is available when user clicks on the tripcard

  //       this.props.db
  //         .collection("trips")
  //         .get()
  //         .then(
  //           snapshot => {
  //             const data = snapshot.docs;
  //             if (data.length) {
  //               let tripDates = [];
  //               let tripArray = [];
  //               data.forEach(doc => {
  //                 const trip = doc.data();
  //                 let tripRecord = {
  //                   id: doc.id,
  //                   city: trip.city,
  //                   country: trip.country,
  //                   temperature: trip.temperature,
  //                   weather: trip.weather,
  //                   weatherIcon: trip.weatherIcon,
  //                   dateStart: trip.dateStart.seconds,
  //                   dateEnd: trip.dateEnd.seconds,
  //                   place1: trip.place1,
  //                   place2: trip.place2,
  //                   place3: trip.place3,
  //                   place4: trip.place4,
  //                   imageUrl: trip.imageUrl,
  //                   coordinates: trip.coordinates
  //                   // lat: trip.lat,
  //                   // lon: trip.lon
  //                 };
  //                 tripDates.push({
  //                   start: this.dateObject(trip.dateStart.seconds),
  //                   end: this.dateObject(trip.dateEnd.seconds)
  //                 });
  //                 this.props.setTripDates(tripDates);
  //                 tripArray.push(tripRecord);
  //               });

  //               this.setState({ travelPlan: tripArray });
  //               this.setState({ cardsUpdated: true });

  //               this.props.refreshCardsDone();

  //               // Check that the current selected city still exists in the database
  //               // (maybe it just got deleted)
  //               let city_record = obj => {
  //                 return (
  //                   obj.City === this.state.city &&
  //                   obj.Country === this.state.country
  //                 );
  //               };
  //               const selectedCityFound = tripArray.find(city_record);
  //               if (!selectedCityFound) {
  //                 // Assign another selected city
  //                 this.setState({
  //                   city: tripArray[0].city,
  //                   country: tripArray[0].country
  //                 });
  //                 // Simulate user selection of the first card in the deck
  //                 //this.handleCardClick(tripArray[0].city);
  //               }
  //             } else {
  //               console.log("No records found");
  //             }
  //           },
  //           err => console.log(err.message)
  //         );
  //     }
  //   } else {
  //     if (this.state.cardsUpdated) {
  //       this.setState({ cardsUpdated: false });
  //     }
  //   }
  // }
  render() {
    return (
      <div>
        <div className="CardDeck">
          <div className="Trip-cards">
            {this.props.cards.cardsVisible &&
              // this.state.travelPlan.map(p => (
              this.props.cards.tripData.map(p => (
                <Tripcard
                  key={p.country + p.city}
                  docId={p.id}
                  city={p.city}
                  country={p.country}
                  imageUrl={p.imageUrl}
                  startDate={p.dateStart}
                  endDate={p.dateEnd}
                  clickHandler={this.handleCardClick}
                  deleteHandler={this.handleCardDelete}
                  editHandler={this.handleCardEdit}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

//export default TravelCards;

//export default NavBar;
const mapStateToProps = state => {
  return { cards: state.cards, places: state.places, firebase: state.firebase };
};
export default connect(
  mapStateToProps,
  {
    setCardsVisible,
    setTripId,
    // setCity,
    setCountry,
    setPlacesMenu,
    setPlaceSelected,
    setPlaceImageUrl,
    refreshCardsDone,
    loadDataLocal,
    loadDataExternal,
    updateTrip,
    deleteTrip,
    refreshCards
  }
)(TravelCards);
