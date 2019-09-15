import React, { Component } from "react";
import Tripcard from "./Tripcard";
import "./Pokedex.css";

class Pokedex extends Component {
  render() {
    return (
      <div className="container">
        <div className="Pokedex">
          <h4>Demo cards: </h4>
          <div className="Pokedex-cards">
            {this.props.pokemon.map(p => (
              <Tripcard
                id={p.id}
                name={p.name}
                type={p.type}
                exp={p.base_experience}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Pokedex;
