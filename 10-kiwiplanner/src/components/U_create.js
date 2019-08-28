import React, { Component } from "react";
import PickCity from "./U_pickcity";
import "./U_create.css";
import PickDate from "./U_pickdate";

import M from "materialize-css";

class U_create extends Component {
  static defaultProps = {
    target: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      poi1: "",
      poi2: "",
      poi3: "",
      poi4: "",
      dateStart: "",
      dateEnd: "",
      temperature: "",
      weather: "",
      coordinates: ""
    };
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, {});
    });
  }

  setDestination = (city, country) => {
    this.setState({ city: city, country: country });
    alert("detected " + city + " " + country);
  };
  setDates = (start, end) => {
    this.setState({ dateStart: start, dateEnd: end });
  };

  handlePlaceChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    alert("saving record for " + this.state.city + " " + this.state.country);
    this.props.db
      .collection("trips")
      .add({
        city: this.state.city,
        country: this.state.country,
        temperature: this.state.temperature,
        weather: this.state.weather,
        dateStart: this.state.dateStart,
        dateEnd: this.state.dateEnd,
        place1: this.state.poi1,
        place2: this.state.poi2,
        place3: this.state.poi3,
        place4: this.state.poi4,
        coordinates: this.state.coordinates
      })
      .then(() => {
        // close the create modal & reset form
        const modal = document.querySelector("#modal-create");
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
      <div id="modal-create" className="modal">
        <div className="modal-content">
          <form
            autoComplete="off"
            id="create-form"
            onSubmit={this.handleSubmit}
          >
            <PickDate setDates={this.setDates} />
            <PickCity setDestination={this.setDestination} />
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

export default U_create;
