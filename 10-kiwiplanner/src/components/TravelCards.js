import { connect } from "react-redux";
import {
  setCardsVisible,
  setCity,
  setCountry,
  setMenuPlaces,
  setPlaceSelected,
  setImageUrl,
  refreshCardsDone,
  deleteTrip
} from "../actions";

import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./TravelCards.css";

class TravelCards extends Component {
  state = {
    city: "",
    country: "",
    cardsUpdated: false,
    travelPlan: []
  };
  stripYear = date => {
    const temp = date.split(" ");
    return temp[0] + " " + temp[1];
  };
  updateCards = () => {
    // Cards not updated will trigger a re-render of the cards
    this.setState({ cardsUpdated: false });
  };
  handleCardClick = city => {
    const places = [];
    places.push(city);
    const destRecord = this.state.travelPlan.find(record => {
      return record.city === city.trim();
    });
    if (destRecord) {
      // If the field exist then push it into the MenuOptions
      destRecord.place1 && places.push(destRecord.place1);
      destRecord.place2 && places.push(destRecord.place2);
      destRecord.place3 && places.push(destRecord.place3);
      destRecord.place4 && places.push(destRecord.place4);
    }
    this.props.setCity(city);
    this.props.setCountry(destRecord.country);
    this.props.setMenuPlaces(places);
    this.props.setPlaceSelected(city);
    this.props.setImageUrl(destRecord.imageUrl);
    this.props.setCardsVisible(false);

    this.setState({ city: city, country: destRecord.country });
    this.props.setMenuOptions(places, destRecord.country, destRecord.imageUrl);
  };
  handleCardDelete = city => {
    const temp = [];
    temp.push(city);
    const destRecord = this.state.travelPlan.find(record => {
      return record.city === city.trim();
    });
    if (destRecord) {
      // If the field exist then push it into the MenuOptions
      //this.props.performDelete(destRecord);
      this.props.deleteTrip(destRecord);
    }
  };
  handleCardEdit = city => {
    const temp = [];
    temp.push(city);
    const destRecord = this.state.travelPlan.find(record => {
      return record.city === city.trim();
    });
    if (destRecord) {
      // If the field exist then push it into the MenuOptions
      this.props.performUpdate(destRecord);
    }
  };
  dateObject = dateSeconds => {
    // Date is stored in mongo as unix timestamp
    // provide time in milliseconds as input argument to create Date Object
    return new Date(dateSeconds * 1000);
  };

  // This gets called when the cards have been updated (delete or update events)
  componentDidUpdate(prevProps) {
    if (prevProps.cards.isRefreshed !== this.props.cards.isRefreshed) {
      this.setState({ cardsUpdated: false });
    }

    if (this.props.user) {
      if (!this.state.cardsUpdated) {
        this.props.db
          .collection("trips")
          .get()
          .then(
            snapshot => {
              const data = snapshot.docs;
              if (data.length) {
                let tripDates = [];
                let tripArray = [];
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
                  tripDates.push({
                    start: this.dateObject(trip.dateStart.seconds),
                    end: this.dateObject(trip.dateEnd.seconds)
                  });
                  this.props.setTripDates(tripDates);
                  tripArray.push(tripRecord);
                });

                this.setState({ travelPlan: tripArray });
                this.setState({ cardsUpdated: true });

                this.props.refreshCardsDone();

                // Check that the current selected city still exists in the database
                // (maybe it just got deleted)
                let city_record = obj => {
                  return (
                    obj.City === this.state.city &&
                    obj.Country === this.state.country
                  );
                };
                const selectedCityFound = tripArray.find(city_record);
                if (!selectedCityFound) {
                  // Assign another selected city
                  this.setState({
                    city: tripArray[0].city,
                    country: tripArray[0].country
                  });
                  // Simulate user selection of the first card in the deck
                  //this.handleCardClick(tripArray[0].city);
                }
              } else {
                console.log("No records found");
              }
            },
            err => console.log(err.message)
          );
      }
    } else {
      if (this.state.cardsUpdated) {
        this.setState({ cardsUpdated: false });
      }
    }
  }
  render() {
    return (
      <div>
        <div className="CardDeck">
          <div className="Trip-cards">
            {this.props.cards.cardsVisible &&
              this.state.travelPlan.map(p => (
                <Tripcard
                  key={p.country + p.city}
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
  return { cards: state.cards };
};
export default connect(
  mapStateToProps,
  {
    setCardsVisible,
    setCity,
    setCountry,
    setMenuPlaces,
    setPlaceSelected,
    setImageUrl,
    refreshCardsDone,
    deleteTrip
  }
)(TravelCards);
