import React, { Component } from "react";
import unsplash from "./Unsplash";
import "./Tripcard.css";
import CityTemperature from "./CityTemperature";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const defaultImage =
  "https://images.freeimages.com/images/large-previews/1f8/delicate-arch-1-1391746.jpg";
class Tripcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      imgSrc: defaultImage
    };
  }
  searchCity = async term => {
    const response = await unsplash.get(
      "https://api.unsplash.com/search/photos?per_page=1&order_by='popular'",
      {
        params: { query: term }
      }
    );
    try {
      this.setState({ imgSrc: response.data.results[0].urls.small });
    } catch (error) {
      this.setState({ imgSrc: defaultImage });
    }
  };
  // The click handle will not respond if the user selected delete icon or update icon
  clickHandler = () => {
    this.props.clickHandler(this.props.city);
  };
  deleteHandler = event => {
    event.stopPropagation();
    this.props.deleteHandler(this.props.city);
  };
  editHandler = () => {
    this.props.editHandler(this.props.city);
  };

  // Conditional rendering - Use historical data if not this month
  cityWeather = () => {
    const iconUrl =
      "http://openweathermap.org/img/w/" + this.props.icon + ".png";

    const d = new Date();
    const index = d.getMonth();
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
    const thisMonth = months[index];
    const tripDate = this.props.startDate.split(" ");
    const tripMonth = tripDate[1].trim();
    // If the trip is this month: we use the forecasted weather data
    if (tripMonth === thisMonth) {
      return (
        <div>
          <img
            className="Tripcard-icon"
            src={iconUrl}
            alt={this.props.weather}
          />
          <div className="Tripcard-temp">{this.props.temperature} &#8451;</div>
        </div>
      );
    } else {
      // If the trip not this month: we use the historical weather data
      return (
        <CityTemperature
          city={this.props.city}
          country={this.props.country}
          month={tripMonth}
        />
      );
    }
  };

  render() {
    const imgSrc = this.state.imgSrc;

    if (this.props.city !== this.state.city) {
      this.setState({ city: this.props.city });
      this.searchCity(this.props.city);
    }

    return (
      <div className="Tripcard" onClick={this.clickHandler}>
        <div className="box">
          <div className="Icons TrashRow">
            <FontAwesomeIcon
              className="TripIcon"
              onClick={this.deleteHandler}
              icon={faTrashAlt}
              size="1x"
            />
          </div>
          <div className="Icons EditRow">
            <FontAwesomeIcon
              className="TripIcon"
              onClick={this.editHandler}
              icon={faEdit}
              size="1x"
            />
          </div>
          <img className="Trip-image" src={imgSrc} alt={this.props.city} />
          <div className="text">
            <div className="Tripcard-title">{this.props.city}</div>
          </div>
        </div>

        <div className="Tripcard-data">{this.cityWeather()}</div>

        <div className="Tripcard-data">
          {this.props.startDate}-{this.props.endDate}
        </div>
      </div>
    );
  }
}

export default Tripcard;
