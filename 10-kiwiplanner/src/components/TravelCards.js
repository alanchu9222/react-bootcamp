import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./TravelCards.css";

class TravelCards extends Component {
  static defaultProps = {
    trips: [
      {
        id: 4,
        name: "Adelaide",
        type: "18",
        base_experience: "AUG 13"
      },
      {
        id: 7,
        name: "Melbourne",
        type: "18",
        base_experience: "AUG 13"
      },
      {
        id: 11,
        name: "Sydney",
        type: "18",
        base_experience: "AUG 13"
      },
      {
        id: 12,
        name: "Hobart",
        type: "18",
        base_experience: "AUG 13"
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
                name={p.name}
                type={p.type}
                startDate={p.base_experience}
                endDate={p.base_experience}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TravelCards;
