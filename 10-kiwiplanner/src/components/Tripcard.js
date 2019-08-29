import React, { Component } from "react";
import unsplash from "./Unsplash";
import "./Tripcard.css";
import CityTemperature from "./CityTemperature";

class Tripcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      imgSrc:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjg0MDU4fQ"
    };
  }
  searchCity = async term => {
    const response = await unsplash.get(
      "https://api.unsplash.com/search/photos?per_page=1&order_by='popular'",
      {
        params: { query: term }
      }
    );
    this.setState({ imgSrc: response.data.results[0].urls.small });
  };

  clickHandler = () => {
    this.props.clickHandler(this.props.city);
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
          <img className="Trip-image" src={imgSrc} alt={this.props.city} />
          <div className="text">
            <div className="Tripcard-title">{this.props.city}</div>
          </div>
        </div>

        <div className="Tripcard-data">
          {this.cityWeather()}
        </div>

        <div className="Tripcard-data">
          {this.props.startDate}-{this.props.endDate}
        </div>
      </div>
    );
  }
}

export default Tripcard;
