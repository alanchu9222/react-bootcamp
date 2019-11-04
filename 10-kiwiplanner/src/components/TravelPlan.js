import { connect } from "react-redux";
import { loadDataExternal } from "../actions";

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { food, culture, monuments, hotels, nature } from "../data/images";
import "./TravelPlan.css";

class TravelPlan extends Component {
  constructor(props) {
    super(props);
    this.collapsible = React.createRef();
    this.tripRecord = [];
  }

  state = {
    city: "",
    country: "",
    lat: "",
    lon: "",
    ready: false,
    searchInProgress: false,
    list: []
  };

  showListItem = menuItem => {
    if (menuItem.url && menuItem.phone) {
      return (
        <li className="z-depth-0 white grey-text listItem">
          <a href={menuItem.url} target="_blank"  rel="noopener noreferrer">
            {menuItem.name}
          </a>
          + <FontAwesomeIcon icon={faPhone} size="1x" color="grey" /> +
          {menuItem.phone}
        </li>
      );
    } else if (menuItem.phone) {
      return (
        <li className="z-depth-0 white grey-text listItem">
          {menuItem.name}
          + <FontAwesomeIcon icon={faPhone} size="1x" color="grey" /> +
          {menuItem.phone}
        </li>
      );
    } else {
      return (
        <li className="z-depth-0 white grey-text listItem">{menuItem.name}</li>
      );
    }
  };

  random = n => {
    return Math.floor(Math.random() * Math.floor(n)) + 1;
  };

  listTravelPlan = listItem => {
    return (
      <li key={listItem.title}>
        <div className="collapsible-header grey lighten-4 grey-text">
          {listItem.title}
        </div>
        <div className="collapsible-body white">
          <ul>{listItem.content.map(this.showListItem)}</ul>
        </div>
      </li>
    );
  };
  showTravelPanels = listItem => {
    let imageUrl = "";
    if (listItem.title.toUpperCase().includes("ATTRACTIONS")) {
      imageUrl = monuments[this.random(10)];
    }
    if (listItem.title.toUpperCase().includes("FOOD")) {
      imageUrl = food[this.random(10)];
    }
    if (listItem.title.toUpperCase().includes("CAFE")) {
      imageUrl = culture[this.random(10)];
    }
    if (listItem.title.toUpperCase().includes("RECREATION")) {
      imageUrl = nature[this.random(10)];
    }
    if (listItem.title.toUpperCase().includes("ACCOM")) {
      imageUrl = hotels[this.random(10)];
    }
    return (
      <>
        <img className="grid-image disable-select" src={imageUrl} alt="" />
        <div>
          <div className="panel-header disable-select">{listItem.title}</div>
          <ul>{listItem.content.map(this.showListItem)}</ul>
        </div>
      </>
    );
  };

  render() {
    return (
      <div className="container travel-plan">
        {!this.props.cards.cardsVisible && (
          <div className="grid-container">
            <h2 className="grid-header disable-select">
              {this.props.places.place_selected} {this.props.places.country_selected}
            </h2>
            {this.props.places.currentData &&
              this.props.places.currentData.map(this.showTravelPanels)}
          </div>
        )}
      </div>
    );
  }
}

//export default TravelPlan;
const mapStateToProps = state => {
  return { cards: state.cards, places: state.places };
};
export default connect(
  mapStateToProps,
  { loadDataExternal }
)(TravelPlan);
