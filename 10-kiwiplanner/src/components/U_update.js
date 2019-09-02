import React, { Component } from "react";
import PickCity from "./U_pickcity";
import "./U_create.css";
import PickDate from "./U_pickdate";
import axios from "axios";
import M from "materialize-css";

class U_update extends Component {
  static defaultProps = {
    target: ""
  };

  constructor(props) {
    super(props);
    this.pickCity = React.createRef();
    this.state = {
      tripIdToUpdate: "",
      destinationValue: "",
      modalUpdate: null,
      alertBox: null,
      dataReady: false,
      tripData: ""
    };
  }
  // The parent will trigger a update process form this method
  setPlaceUpdate = trip => {
    this.setState({
      tripIdToUpdate: trip.id,
      tripData: trip
    });
    this.state.modalUpdate.open();
  };

  getWeatherForecast = () => {};
  componentDidMount() {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});

    const alertBox = document.querySelector("#modal2");
    const instance = M.Modal.getInstance(alertBox);
    this.setState({ alertBox: instance });

    const modalUpdate = document.querySelector("#modal-update");
    const instance2 = M.Modal.getInstance(modalUpdate);
    this.setState({ modalUpdate: instance2 });
  }
  // ACDEBUG
  // When destination is identified
  // Get the weather forecast for the given date
  setDestination = dest => {
    const arr = dest.split("-");
    const city = arr[0].trim();
    const country = arr[1].trim();
    this.setState({ destinationValue: dest, city: city, country: country });
    alert(
      "detected " +
        city +
        " " +
        country +
        "dates " +
        this.state.dateStart +
        " " +
        this.state.dateEnd
    );
  };
  formatDate = date => {
    var monthNames = [
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

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  };
  setDates = (start, end) => {
    this.setState({
      dateStart: this.formatDate(start),
      dateEnd: this.formatDate(end)
    });
  };

  handlePlaceChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.city || !this.state.country) {
      this.setState({ city: "", country: "" });
      this.setState({
        flashMessage:
          "Invalid destination specified, please select from presented options"
      });
      this.setState({ destinationValue: "" });
      this.pickCity.current.setDestination("");
      this.state.alertBox.open();
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=c6dd7c2aa863d2f936a3056172dffce8&units=metric`
      )
      .then(res => {
        const data = res.data;
        this.setState({
          temperature: data.main.temp,
          weather: data.weather[0].main,
          weatherIcon: data.weather[0].icon
        });
        // Update database with the latest weather information
        this.props.db
          .collection("trips")
          .add({
            city: this.state.trip.city,
            country: this.state.trip.country,
            temperature: this.state.trip.temperature,
            weather: this.state.trip.weather,
            weatherIcon: this.state.trip.weatherIcon,
            dateStart: this.state.trip.dateStart,
            dateEnd: this.state.trip.dateEnd,
            place1: this.state.trip.poi1,
            place2: this.state.trip.poi2,
            place3: this.state.trip.poi3,
            place4: this.state.trip.poi4
          })
          .then(() => {
            alert(
              "Successsfully saved record for " +
                this.state.city +
                " " +
                this.state.country
            );

            this.setState({ city: "", country: "" });
            // close the create modal & reset form
            const modal = document.querySelector("#modal-update");
            M.Modal.getInstance(modal).close();
            this.props.refresh();
            //this.createForm.reset();
          })
          .catch(err => {
            console.log(err.message);
          });
      });
  };

  render() {
    return (
      <div id="modal-update" className="modal">
        <div className="modal-content">
          <div id="modal2" className="modal">
            <div class="modal-content">
              <p>{this.state.flashMessage}</p>
            </div>
            <div class="modal-footer">
              <a
                href="#!"
                class="modal-close waves-effect waves-green btn-flat"
              >
                Ok
              </a>
            </div>
          </div>
          <form
            autoComplete="off"
            id="create-form"
            onSubmit={this.handleSubmit}
          >
            <PickDate setDates={this.setDates} />
            <PickCity
              ref={this.pickCity}
              setDestination={this.setDestination}
              destVal={this.destinationValue}
            />
            <div className="flex-container">
              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi1"
                />

                <label htmlFor="content">Place of Interest 1</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi2"
                />
                <label htmlFor="content">Place of Interest 2</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi3"
                />
                <label htmlFor="content">Place of Interest 3</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi4"
                />
                <label htmlFor="content">Place of Interest 4</label>
              </div>
            </div>

            <button className="button btn yellow darken-2 z-depth-0">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default U_update;
