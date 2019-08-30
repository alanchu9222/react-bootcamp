import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./TravelCards.css";

class TravelCards extends Component {
  state = {
    user: "",
    cardsUpdated: false,
    travelPlan: []
  };
  stripYear = date => {
    const temp = date.split(" ");
    return temp[0] + " " + temp[1];
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
    this.props.setMenuOptions(temp, destRecord.country);
  };
  componentDidUpdate() {
    if (this.props.user) {
      console.log("USER LOGGED IN AS " + this.props.user);
      if (!this.state.cardsUpdated) {
        this.props.db
          .collection("trips")
          .get()
          .then(
            snapshot => {
              console.log(snapshot.docs);
              const data = snapshot.docs;
              if (data.length) {
                let tripArray = [];
                data.forEach(doc => {
                  const trip = doc.data();
                  const startDate = this.stripYear(trip.dateStart);
                  const endDate = this.stripYear(trip.dateEnd);
                  let tripRecord = {
                    city: trip.city,
                    country: trip.country,
                    temperature: trip.temperature,
                    weather: trip.weather,
                    weatherIcon: trip.weatherIcon,
                    dateStart: startDate,
                    dateEnd: endDate,
                    place1: trip.place1,
                    place2: trip.place2,
                    place3: trip.place3,
                    place4: trip.place4
                  };
                  tripArray.push(tripRecord);
                  console.log("trip record");
                  console.log(tripRecord);
                });                
                this.setState({ travelPlan: tripArray });                
                this.setState({ cardsUpdated: true });
                // Select the one place that is has the closest date to today
                // Then render the travel plan for that place
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
      console.log("USER NOT LOGGED IN");
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
                weather={p.weather}
                icon={p.weatherIcon}
                temperature={p.temperature}
                startDate={p.dateStart}
                endDate={p.dateEnd}
                clickHandler={this.handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TravelCards;
