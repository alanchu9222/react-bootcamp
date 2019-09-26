import React, { Component } from "react";
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
      //      alertBox: null,
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
    //const start = new Date(trip.dateStart * 1000);
    //const end = new Date(trip.dateEnd * 1000);
    //this.pickDate.current.setInitialDates(start, end);
    this.state.modalUpdate.open();
  };

  getWeatherForecast = () => {};

  componentDidMount() {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, { dismissable: true });

    // const alertBox = document.querySelector("#modal2");
    // const instance = M.Modal.getInstance(alertBox);
    // this.setState({ alertBox: instance });

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
        this.state.modalUpdate.close();
        this.props.refresh();
        //this.createForm.reset();
      })
      .catch(err => {
        alert(err.message);
        console.log(err.message);
      });
  };
  closeForm = () => {
    this.state.modalUpdate && this.state.modalUpdate.close();
  };
  render() {
    return (
      <div id="modal-update" className="modal">
        <div className="modal-content">
          <form
            autoComplete="off"
            id="update-form"
            onSubmit={this.handleSubmit}
          >
            <PickDate
              setDates={this.setDates}
              trip={this.tripData}
              ref={this.pickDate}
              minStartDate={null}
              excludeDates={[]}
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
                  id="update_poi1"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi1"
                  value={this.state.poi1}
                />

                <label htmlFor="update_poi1"></label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="update_poi2"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi2"
                  value={this.state.poi2}
                />
                <label htmlFor="update_poi2"></label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="update_poi3"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi3"
                  value={this.state.poi3}
                />
                <label htmlFor="update_poi3"></label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="update_poi4"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi4"
                  value={this.state.poi4}
                />
                <label htmlFor="update_poi4"></label>
              </div>
            </div>

            <button
              onClick={this.handleSubmit}
              className="button btn yellow darken-2 z-depth-1 waves-effect waves-light"
            >
              Update
            </button>
            <button
              onClick={this.closeForm}
              className="button btn yellow darken-2 z-depth-1 waves-effect waves-light"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default U_update;
