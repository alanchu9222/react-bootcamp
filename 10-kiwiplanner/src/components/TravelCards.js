import { connect } from "react-redux";
import {
  setCardsVisible,
  setTripId,
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
import history from "../history";
import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./TravelCards.css";

class TravelCards extends Component {
  stripYear = date => {
    const temp = date.split(" ");
    return temp[0] + " " + temp[1];
  };
  // User selects a card
  handleCardClick = (city, docId) => {
    console.log("Travel card clicked");
    const places = [];
    places.push(city);
    const destRecord = this.props.cards.tripData.find(doc => {
      return doc.id === docId;
    });
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
    const searchKey = city + "-" + destRecord.country;
    this.props.setPlaceSelected(city, destRecord.country);
    this.props.loadDataLocal(city, destRecord.country);
    /* Check that the city has local data - if none then load from external API */
    if (!this.props.places.placesInLocalStore.includes(searchKey)) {
      this.props.loadDataExternal(city, destRecord.country);
    }
    history.push("/travel-guide/show/" + searchKey);
  };
  handleCardDelete = docId => {
    const destRecord = this.props.cards.tripData.find(record => {
      return record.id === docId;
    });
    if (destRecord) {
      this.props.deleteTrip(destRecord);
    }
  };
  handleCardEdit = docId => {
    const destRecord = this.props.cards.tripData.find(record => {
      return record.id === docId;
    });
    if (destRecord) {
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

  render() {
    return (
      <div>
        <div className="CardDeck">
          <div className="Trip-cards">
            {this.props.cards.cardsVisible &&
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
    setCountry,
    setPlacesMenu,
    setPlaceImageUrl,
    refreshCardsDone,
    setPlaceSelected,
    loadDataLocal,
    loadDataExternal,
    updateTrip,
    deleteTrip,
    refreshCards
  }
)(TravelCards);
