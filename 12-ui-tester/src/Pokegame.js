import React, { Component } from "react";
import Pokedex from "./Pokedex";

class Pokegame extends Component {
  static defaultProps = {
    pokemon: [
      {
        id: 4,
        name: "Adelaide",
        type: "18",
        base_experience: "AUG 13-14"
      },
      {
        id: 7,
        name: "Melbourne",
        type: "18",
        base_experience: "AUG 13-14"
      },
      {
        id: 11,
        name: "Sydney",
        type: "18",
        base_experience: "AUG 13-14"
      },
      {
        id: 12,
        name: "Hobart",
        type: "18",
        base_experience: "AUG 13-14"
      },
      {
        id: 25,
        name: "Shepparton",
        type: "18",
        base_experience: "AUG 13-14"
      },
      {
        id: 39,
        name: "Sorrento",
        type: "18",
        base_experience: "AUG 13-14"
      },
      {
        id: 94,
        name: "Bendigo",
        type: "18",
        base_experience: "AUG 13-14"
      },
      {
        id: 133,
        name: "Geelong",
        type: "18",
        base_experience: "AUG 13-14"
      }
    ]
  };
  render() {
    let hand1 = [];
    let hand2 = [...this.props.pokemon];
    while (hand1.length < 6) {
      let randIdx = Math.floor(Math.random() * hand2.length);
      let randPokemon = hand2.splice(randIdx, 1)[0];
      hand1.push(randPokemon);
    }
    let exp1 = hand1.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
    let exp2 = hand2.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
    return (
      <div>
        <Pokedex pokemon={hand1} exp={exp1} isWinner={exp1 > exp2} />
      </div>
    );
  }
}
export default Pokegame;
