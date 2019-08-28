import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./TravelCards.css";

class TravelCards extends Component {
  state = {
    user: "",
    cardsUpdated: false,
    travelPlan: []
  };
  formatDate = date => {
    if (date.length != 10) {
      return "";
    }
    let fdate = "";
    let month = "";
    let day = "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    month = date.slice(5, 7);
    day = date.slice(-2);
    fdate = day + " " + months[Number(month - 1)];
    console.log("month day");
    console.log(month + " " + day);
    return fdate;
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
    this.props.setMenuOptions(temp);
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
                  const startDate = this.formatDate(trip.dateStart);
                  const endDate = this.formatDate(trip.dateEnd);
                  let tripRecord = {
                    city: trip.city,
                    country: trip.country,
                    temperature: trip.temperature,
                    dateStart: startDate,
                    dateEnd: endDate,
                    place1: trip.place1,
                    place2: trip.place2,
                    place3: trip.place3,
                    place4: trip.place4
                  };
                  tripArray.push(tripRecord);
                });
                this.setState({ travelPlan: tripArray });
                this.setState({ cardsUpdated: true });
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
