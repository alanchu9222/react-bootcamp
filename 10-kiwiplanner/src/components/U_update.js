import React, { Component } from "react";
import "./U_create.css";
import "./U_update.css";
import PickDate from "./U_pickdate";
import M from "materialize-css";

class U_update extends Component {
  static defaultProps = {
    target: ""
  };

  constructor(props) {
    super(props);
    this.pickCity = React.createRef();
    this.pickDate = React.createRef();
    this.state = {
      tripIdToUpdate: "",
      destinationValue: "",
      modalUpdate: null,
      alertBox: null,
      dataReady: false,
      tripData: "",
      poi1: "",
      poi2: "",
      poi3: "",
      poi4: "",
      dateStart: "",
      dateEnd: ""
    };
  }
  // The parent will trigger a update process form this method
  setPlaceUpdate = trip => {
    this.setState({
      tripIdToUpdate: trip.id,
      poi1: trip.place1,
      poi2: trip.place2,
      poi3: trip.place3,
      poi4: trip.place4,
      tripData: trip
    });
    const start = new Date(trip.dateStart * 1000);
    const end = new Date(trip.dateEnd * 1000);
    this.pickDate.current.setInitialDates(start, end);
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
  setDates = (start, end) => {
    this.setState({
      dateStart: start,
      dateEnd: end
    });
  };

  handlePlaceChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // Update database with the latest weather information
    this.props.db
      .collection("trips")
      .doc(this.state.tripIdToUpdate)
      .update({
        city: this.state.tripData.city,
        country: this.state.tripData.country,
        temperature: this.state.tripData.temperature,
        weather: this.state.tripData.weather,
        weatherIcon: this.state.tripData.weatherIcon,
        dateStart: this.state.dateStart,
        dateEnd: this.state.dateEnd,
        place1: this.state.poi1,
        place2: this.state.poi2,
        place3: this.state.poi3,
        place4: this.state.poi4
      })
      .then(() => {
        console.log(
          "Successfully updated record for " +
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
            <PickDate
              setDates={this.setDates}
              trip={this.tripData}
              ref={this.pickDate}
            />
            <div className="flex-container">
              <div className="form-header">
                <h5>
                  {this.state.tripData.city +
                    "   " +
                    this.state.tripData.country}
                </h5>
              </div>
              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi1"
                  value={this.state.poi1}
                />

                <label htmlFor="content"></label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi2"
                  value={this.state.poi2}
                />
                <label htmlFor="content"></label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi3"
                  value={this.state.poi3}
                />
                <label htmlFor="content"></label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi4"
                  value={this.state.poi4}
                />
                <label htmlFor="content"></label>
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
