import React, { Component } from "react";
import "./Tripcard.css";
// get our fontawesome imports
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import { faCloudShowersHeavy } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureLow } from "@fortawesome/free-solid-svg-icons";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const POKE_API = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const POKE_API = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

let padToThree = number => (number <= 999 ? `00${number}`.slice(-3) : number);

class Tripcard extends Component {
  render() {
    //let imgSrc = `${POKE_API}${padToThree(this.props.id)}.png`;
    let imgSrc =
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjg0MDU4fQ";

    return (
      <div className="Tripcard">
        <div className="box">
          <img src={imgSrc} alt={this.props.name} />
          <div className="text">
            <div className="Tripcard-title">{this.props.name}</div>
          </div>
        </div>

        <div className="Icons">
          <FontAwesomeIcon icon={faSnowflake} size="3x" color="grey" />
        </div>

        <div className="Tripcard-data">
          <h5>{this.props.type} &#8451;</h5>
        </div>
        <div className="Icons">
          <FontAwesomeIcon icon={faMoon} color="grey" />
          &nbsp;&nbsp;{this.props.type} &#8451;
        </div>

        <div className="Tripcard-data">
          {this.props.startDate}-{this.props.endDate}
        </div>
      </div>
    );
  }
}

export default Tripcard;

{
  /*
                        <div class="card-image">
                            <img src="img/melbourne2.png" alt="" class="">
                            <span class="card-title">Melbourne</span>
                        </div>

<FontAwesomeIcon icon={faSnowflake} size="5x" color="grey" />
<FontAwesomeIcon icon={faCloudSun} size="5x" color="grey" />
<FontAwesomeIcon icon={faSun} size="5x" color="grey" />
<FontAwesomeIcon icon={faCloudSunRain} size="5x" color="grey" />
<FontAwesomeIcon icon={faCloudShowersHeavy} size="5x" color="grey" />
<FontAwesomeIcon icon={faTemperatureHigh} size="5x" color="grey" />
<FontAwesomeIcon icon={faTemperatureLow} size="5x" color="grey" />
<FontAwesomeIcon icon={faUmbrella} size="5x" color="grey" />
*/
}
