import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./TravelPlan.css";
import M from "materialize-css";

class TravelPlan extends Component {
  constructor(props) {
    super(props);
    this.collapsible = React.createRef();
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

  componentDidUpdate() {
    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
  }
  getCoordinates = (city, country) => {
    axios
      .get(
        `https://us1.locationiq.com/v1/search.php?key=60b9313fae35ff&q=${city}%20${country}&format=json`
      )
      .then(res => {
        // reset the information list
        this.setState({ list: [] });
        const data = res.data;
        this.setState({
          lat: data[0].lat,
          lon: data[0].lon,
          ready: true,
          searchInProgress: true
        });

        let searchList = [
          { "LOCAL ATTRACTIONS ": "attractions", city: this.state.city },
          { "ACCOMODATIONS ": "hotel_motel", city: this.state.city },
          { "FOOD ": "restaurant", city: this.state.city },
          { "CAFE ": "cafe", city: this.state.city },
          { "RECREATION ": "recreation", city: this.state.city }
        ];
        this.getPlaceInfo(searchList);
        return;
      });
  };
  // The parent component triggers rendering of place information with this method
  setPlace = (city, country) => {
    if (this.state.city === city && this.state.country === country) {
      return;
    }
    if (this.state.searchInProgress) {
      console.log("Loading data for " + city + " " + country);
      return;
    } else {
      console.log("Getting info for " + city + " " + country);
    }
    this.setState({ city: city, country: country, ready: false });
    // Get the new coordinates, only set to ready when the coordinates are available
    this.getCoordinates(city, country);
  };

  getPlaceInfo = searchList => {
    const searchKey = Object.values(searchList[0])[0];
    // Append the city name to the Category Title
    const title =
      Object.keys(searchList[0])[0] + " - " + Object.values(searchList[0])[1];
    searchList.shift();
    const placeInfo = [];
    axios
      .get(
        "https://api.tomtom.com/search/2/search/" +
          searchKey +
          ".json?key=nWLvkbwKuylT208jAh7FEOR9JFAxzg0I&lat=" +
          this.state.lat +
          "&lon=" +
          this.state.lon
      )
      .then(response => {
        let content = [];
        response.data.results.forEach(item => {
          let url = "";
          if (item.poi.url) {
            url =
              item.poi.url.substring(0, 4) === "http"
                ? item.poi.url
                : "http://" + item.poi.url;
          }
          const myitem = {
            name: item.poi.name,
            phone: item.poi.phone,
            url: url
          };
          content.push(myitem);
        });

        const doc = {
          title: title,
          content: content
        };
        placeInfo.push(doc);
        this.setupGuides(placeInfo);
        if (searchList.length > 0) {
          // Search the next keyword/category
          this.getPlaceInfo(searchList);
        } else {
          // End the keyword/category search
          this.setState({ searchInProgress: false });
          return;
        }
      })
      .catch(error => {
        this.setState({ searchInProgress: false });
        console.log(error);
      });
  };

  // setup guides
  setupGuides = data => {
    if (data.length) {
      data.forEach(doc => {
        const file = doc;
        const listItem = { title: file.title, content: file.content };

        this.setState({
          list: this.state.list.concat(listItem)
        });
      });
    }
  };

  showListItem = menuItem => {
    if (menuItem.url) {
      return (
        <li className="z-depth-0 white grey-text listItem">
          <a href={menuItem.url} target="">
            {menuItem.name}
          </a>
          + <FontAwesomeIcon icon={faPhone} size="1x" color="grey" /> +
          {menuItem.phone}
        </li>
      );
    } else {
      return (
        <li className="z-depth-0 white grey-text listItem">
          {menuItem.name}
          + <FontAwesomeIcon icon={faPhone} size="1x" color="grey" /> +
          {menuItem.phone}
        </li>
      );
    }
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

  render() {
    return (
      <div className="container">
        <ul className="collapsible z-depth-0 ref={this.collapsible}">
          {this.state.ready && this.state.list.map(this.listTravelPlan)}
        </ul>
      </div>
    );
  }
}

export default TravelPlan;
