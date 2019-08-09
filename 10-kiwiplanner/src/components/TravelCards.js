import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./TravelCards.css";

class TravelCards extends Component {
  static defaultProps = {
    trips: [
      {
        id: 4,
        city: "Adelaide",
        country: "Australia",
        temperature: "18",
        date: "AUG 13"
      },
      {
        id: 7,
        city: "Melbourne",
        country: "Australia",
        temperature: "18",
        date: "AUG 13"
      },
      {
        id: 11,
        city: "Sydney",
        country: "Australia",
        temperature: "18",
        date: "AUG 13"
      },
      {
        id: 12,
        city: "Hobart",
        country: "Australia",
        temperature: "18",
        date: "AUG 13"
      }
    ]
  };

  render() {
    return (
      <div>
        <div className="CardDeck">
          <div className="Trip-cards">
            {this.props.trips.map(p => (
              <Tripcard
                id={p.id}
                city={p.city}
                country={p.country}
                temperature={p.temperature}
                startDate={p.date}
                endDate={p.date}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TravelCards;
