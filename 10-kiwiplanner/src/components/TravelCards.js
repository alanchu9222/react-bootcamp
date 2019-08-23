import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./TravelCards.css";

class TravelCards extends Component {
  static defaultProps = {
    trips: [
      {
        id: 4,
        city: "Santiago",
        country: "Chile",
        temperature: "2",
        date: "AUG 13"
      },
      {
        id: 7,
        city: "Cairo",
        country: "Egypt",
        temperature: "28",
        date: "AUG 13"
      },
      {
        id: 11,
        city: "Beijing",
        country: "China",
        temperature: "18",
        date: "AUG 13"
      },
      {
        id: 12,
        city: "Darwin",
        country: "Australia",
        temperature: "40",
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
