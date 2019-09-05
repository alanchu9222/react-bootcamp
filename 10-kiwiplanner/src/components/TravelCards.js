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
    const temp = [];
    temp.push(city);
    const destRecord = this.state.travelPlan.find(record => {
      return record.city === city.trim();
    });
    if (destRecord) {
      // If the field exist then push it into the MenuOptions
      destRecord.place1 && temp.push(destRecord.place1);
      destRecord.place2 && temp.push(destRecord.place2);
      destRecord.place3 && temp.push(destRecord.place3);
      destRecord.place4 && temp.push(destRecord.place4);
    }
    this.setState({ city: city, country: destRecord.country });
    this.props.setMenuOptions(temp, destRecord.country, destRecord.imageUrl);
  };
  handleCardDelete = city => {
    const temp = [];
    temp.push(city);
    const destRecord = this.state.travelPlan.find(record => {
      return record.city === city.trim();
    });
    if (destRecord) {
      // If the field exist then push it into the MenuOptions
      this.props.performDelete(destRecord);
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
  componentDidUpdate() {
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
            {this.state.travelPlan.map(p => (
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

export default TravelCards;
