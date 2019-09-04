import React, { Component } from "react";
import PickCountry from "./U_pickcountry";
import PickCity from "./U_pickcity";
import unsplash from "./Unsplash";
import "./U_create.css";
import PickDate from "./U_pickdate";
import M from "materialize-css";
const defaultImage =
  "https://images.freeimages.com/images/large-previews/1f8/delicate-arch-1-1391746.jpg";

class U_create extends Component {
  static defaultProps = {
    target: ""
  };

  constructor(props) {
    super(props);
    this.pickCountry = React.createRef();
    this.pickCity = React.createRef();

    this.state = {
      alertBox: null,
      dataReady: false,
      imageFound: false,
      countrySearch: false,
      city: "",
      country: "",
      poi1: "",
      poi2: "",
      poi3: "",
      poi4: "",
      dateStart: "",
      dateEnd: "",
      imgUrl: defaultImage,
      // temperature: "",
      // weather: "",
      places: [],
      coordinates: []
    };
  }
  getWeatherForecast = () => {};
  documentLoadedEventHandler = () => {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
    const m1 = document.querySelector("#modal1");
    const instance = M.Modal.getInstance(m1);
    this.setState({ alertBox: instance });
  };

  componentDidMount() {
    document.addEventListener(
      "DOMContentLoaded",
      this.documentLoadedEventHandler
    );
  }
  resetCreateForm = () => {
    this.pickCity.current.reset();
    this.pickCountry.current.reset();
  };

  searchImage = async term => {
    const response = await unsplash.get(
      "https://api.unsplash.com/search/photos?per_page=1&order_by='popular'",
      {
        params: { query: term }
      }
    );
    try {
      this.setState({ imgUrl: response.data.results[0].urls.small });
      this.setState({ imageFound: true });
    } catch (error) {
      if (this.state.countrySearch) {
        // tried to find country and city image but failed
        return;
      }
      this.setState({ countrySearch: true });
      this.searchImage(this.state.country);
    }
  };

  setDestinationCity = dest => {
    const arr = dest.split("-");
    const city = arr[0].trim();
    this.setState({ city: city });
    this.searchImage(city);
  };
  setDestinationCountry = country => {
    this.setState({ country: country.trim() });
    this.pickCity.current.shortlistCities(country);
  };

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
    // Update database with the latest weather information
    this.props.db
      .collection("trips")
      .add({
        city: this.state.city,
        country: this.state.country,
        imageUrl: this.state.imgUrl,
        // temperature: 20.06,
        // weather: "Clear",
        // weatherIcon: "01d",
        dateStart: this.state.dateStart,
        dateEnd: this.state.dateEnd,
        place1: this.state.poi1,
        place2: this.state.poi2,
        place3: this.state.poi3,
        place4: this.state.poi4
      })
      .then(() => {
        console.log(
          "Successsfully saved record for " +
            this.state.city +
            " " +
            this.state.country
        );
        this.resetCreateForm();
        this.setState({ city: "", country: "" });
        // close the create modal & reset form
        const modal = document.querySelector("#modal-create");

        M.Modal.getInstance(modal).close();

        this.props.refresh();
        //this.createForm.reset();
      })
      .catch(err => {
        console.log(err.message);
        alert("UNABLE TO SAVE DATA TO FIREBASE");
      });
  };

  render() {
    return (
      <div id="modal-create" className="modal">
        <div className="modal-content">
          <div id="modal1" class="modal">
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
            <div className="b1">
              <PickCountry
                ref={this.pickCountry}
                setDestination={this.setDestinationCountry}
              />
            </div>
            <div className="b2">
              <PickCity
                ref={this.pickCity}
                country={this.state.country}
                setDestination={this.setDestinationCity}
              />
            </div>
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
