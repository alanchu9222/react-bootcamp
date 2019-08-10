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
    list: []
  };

  componentDidUpdate() {
    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
    //    M.Collapsible.init(this.collapsible);
  }

  getPlaceInfo = (searchKey, title) => {
    const placeInfo = [];
    axios
      .get(
        "https://api.tomtom.com/search/2/search/" +
          searchKey +
          ".json?key=nWLvkbwKuylT208jAh7FEOR9JFAxzg0I&lat=37.8085&lon=-122.4239"
      )
      .then(response => {
        console.log("Attractions");
        console.log(response.data);
        let content = [];
        response.data.results.forEach(item => {
          console.log(
            item.poi.name + "   " + item.poi.phone + "   " + item.poi.url
          );
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
      });
  };

  componentDidMount() {
    //set state with data

    // listen for auth status changes
    this.props.auth.onAuthStateChanged(user => {
      if (user) {
        /*  this.props.db
          .collection("guides")
          .get()
          .then(
            snapshot => {
              this.setupGuides(snapshot.docs);
            },
            err => console.log(err.message)
          );
        */

        this.getPlaceInfo("attractions", "LOCAL ATTRACTIONS");
        this.getPlaceInfo("hotel_motel", "ACCOMODATIONS");
        this.getPlaceInfo("restaurant", "FOOD");
        this.getPlaceInfo("cafe", "CAFE");
        this.getPlaceInfo("museum", "MUSEUMS and GALLERIES");
        this.getPlaceInfo("recreation", "RECREATION");
      } else {
        this.setupGuides([]);
      }
    });
  }

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
      console.log("setup guides");
      console.log(data[0].content);
    }
  };

  showListItem = menuItem => {
    console.log(menuItem.name);
    console.log(menuItem.url);
    if (menuItem.url) {
      return (
        <li className="z-depth-0 white grey-text listItem">
          <a href={menuItem.url} target="_blank">
            {menuItem.name}
          </a>
          + <FontAwesomeIcon icon={faPhone} size="1x" color="grey" /> +
          {menuItem.phone} + <a />
        </li>
      );
    } else {
      return (
        <li className="z-depth-0 white grey-text listItem">
          {menuItem.name}
          + <FontAwesomeIcon icon={faPhone} size="1x" color="grey" /> +
          {menuItem.phone} + <a />
        </li>
      );
    }
  };
  listTravelPlan = listItem => {
    console.log("list item 0 name");
    console.log(listItem.content[0].name);

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
          {this.state.list.map(this.listTravelPlan)}
        </ul>
      </div>
    );
  }
}

export default TravelPlan;
