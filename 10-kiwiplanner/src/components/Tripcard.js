import React, { Component } from "react";
import "./Tripcard.css";
import axios from "axios";
import "./spinner.css";
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
      className: "Tripcard",
      tripMonth: "January",
      tripInProgress: false,
      city: "",
      imgSrc: defaultImage,
      temperature: "loading",
      weather: "loading",
      iconUrl: "http://openweathermap.org/img/w/01d.png"
    };
  }
  // The click handle will not respond if the user selected delete icon or update icon
  clickHandler = () => {
    this.props.clickHandler(this.props.city);
  };
  deleteHandler = event => {
    event.stopPropagation();
    this.props.deleteHandler(this.props.city);
  };
  month = monthSelected => {
    const m = [
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
    return m[monthSelected];
  };
  editHandler = event => {
    event.stopPropagation();
    this.props.editHandler(this.props.city);
  };
  formatDate = dateSeconds => {
    const dateObj = new Date(dateSeconds * 1000);
    return dateObj.getDate() + " " + this.month(dateObj.getMonth());
  };

  getWeatherUpdate = () => {
    const today = new Date();
    const startDate = new Date(this.props.startDate * 1000);
    const endDate = new Date(this.props.startDate * 1000);
    this.setState({ tripMonth: this.month(startDate.getMonth()) });
    let tripStarted = today.getTime() >= startDate.getTime();
    let tripNotFinished =
      today.getTime() <= endDate.getTime() + 1000 * 60 * 60 * 12;
    const tripNow = tripStarted && tripNotFinished;
    this.setState({ tripInProgress: tripNow });
    if (!tripNow) {
      return;
    }
    this.setState({ className: "Tripcard spinner" });
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.props.city},${this.props.country}&appid=c6dd7c2aa863d2f936a3056172dffce8&units=metric`
      )
      .then(res => {
        const data = res.data;
        let icon = data.weather[0].icon;
        let temperature = data.main.temp;
        // Replace night with daytime icons
        if (icon.slice(2, 3) === "n") {
          icon = icon.slice(0, 2) + "d";
        }
        this.setState({
          className: "Tripcard",
          temperature: temperature.toFixed(1),
          weather: data.weather[0].main,
          iconUrl: "http://openweathermap.org/img/w/" + icon + ".png"
        });
      })
      .catch(() => {
        this.setState({
          className: "Tripcard",
          temperature: 25,
          weather: "unknown",
          iconUrl: "http://openweathermap.org/img/w/02d.png"
        });
      });
  };
  render() {
    if (this.props.city !== this.state.city) {
      this.setState({ city: this.props.city });
      if (this.props.imageUrl) {
        this.setState({ imgSrc: this.props.imageUrl });
      }
      this.getWeatherUpdate();
    }

    return (
      <div className={this.state.className} onClick={this.clickHandler}>
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
          <img
            className="Trip-image"
            src={this.state.imgSrc}
            alt={this.props.city}
          />
          <div className="text">
            <div className="Tripcard-title">{this.props.city}</div>
          </div>
        </div>

        <div className="Tripcard-data">
          {this.state.tripInProgress ? (
            <div>
              <img
                className="Tripcard-icon"
                src={this.state.iconUrl}
                alt={this.state.weather}
              />
              <div className="Tripcard-temp">
                {this.state.temperature} &#8451;
              </div>
            </div>
          ) : (
            //If the trip not in progress: we use the historical weather data
            <CityTemperature
              city={this.props.city}
              country={this.props.country}
              month={this.state.tripMonth}
            />
          )}
        </div>

        <div className="Tripcard-data">
          {this.formatDate(this.props.startDate)}-
          {this.formatDate(this.props.endDate)}
        </div>
      </div>
    );
  }
}

export default Tripcard;
