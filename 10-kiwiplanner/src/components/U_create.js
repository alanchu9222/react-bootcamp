import { connect } from "react-redux";
import { refreshCards } from "../actions";
import axios from "axios";

import geolocationApi from "../apis/geolocation";
import unsplash from "../apis/unsplash";

import { LOCATIONIQ_KEY } from "../apis/apikeys";

import React, { Component } from "react";
import PickCountry from "./U_pickcountry";
import PickCity from "./U_pickcity";
//import unsplash from "./Unsplash";
import SimpleModal from "./SimpleModal";
import "./SimpleModal.css";

import "./U_create.css";
import PickDate from "./U_pickdate";
import M from "materialize-css";
const defaultImage =
  "https://images.freeimages.com/images/large-previews/1f8/delicate-arch-1-1391746.jpg";
const initialState = {
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
  places: [],
  coordinates: []
};

class U_create extends Component {
  static defaultProps = {
    target: ""
  };

  constructor(props) {
    super(props);
    this.pickCountry = React.createRef();
    this.pickCity = React.createRef();
    this.pickDate = React.createRef();

    this.state = initialState;
  }
  getWeatherForecast = () => {};
  documentLoadedEventHandler = () => {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  };

  selectSimpleModal = info => {
    this.setState({ simpleModal: !this.state.simpleModal }); // true/false toggle
  };

  initDatePicker = minStartDate => {
    this.pickDate.current.setInitialDates(minStartDate, minStartDate);
  };

  componentDidMount() {
    document.addEventListener(
      "DOMContentLoaded",
      this.documentLoadedEventHandler
    );
  }
  resetCreateForm = () => {
    this.pickCountry.current.reset();
    this.pickCity.current.reset();
    this.setState({ poi1: "", poi2: "", poi3: "", poi4: "" });
    this.setState(initialState);
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
  capitalize = s => {
    if (typeof s !== "string") return "";
    //return s.charAt(0).toUpperCase() + s.slice(1);
    return s
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };
  handlePlaceChange = event => {
    this.setState({ [event.target.name]: this.capitalize(event.target.value) });
  };
  showDates = () => {
    alert("now showing dates");
    console.log(this.props.tripDates);
  };
  formatString = text => {
    let word = text.toLowerCase();
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  };

  getImageUrl = async (city, docRef) => {
    const searchString = "https://api.unsplash.com/search/photos?per_page=1&order_by='popular'";
    const response = await unsplash.get(searchString, {params: { query: city }});
    try {
      docRef.update({ imageUrl: response.data.results[0].urls.small });
    } catch (error) {
      // Nothing found for city, try country instead
      const response2 = await unsplash.get(searchString, {params: { query: city }});
      try {
        docRef.update({ imgUrl: response2.data.results[0].urls.small });
      } catch (error) {
        // Nothing found again: use default image 
        docRef.update({ imgUrl: defaultImage });
      }        
    }
  };

  getCoordinates = async (city, country, docRef) => {

    try {
      const resp = await geolocationApi.get(
        `${LOCATIONIQ_KEY}&q=${city}%20${country}&format=json`
      );

      docRef.update({
        lat: resp.data[0].lat,
        lon: resp.data[0].lon
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    // if (!this.state.city || !this.state.country) {
    //   this.setState({ city: "", country: "" });
    //   this.resetCreateForm();
    //   this.pickCity.current.setDestination("");
    //   // Inform user, input is not valid
    //   this.selectSimpleModal();
    //   return;
    // }
    // Update database with the latest weather information
    this.props.db
      .collection("trips")
      .add({
        city: this.state.city,
        country: this.state.country,
        imageUrl: this.state.imgUrl,
        dateStart: this.state.dateStart,
        dateEnd: this.state.dateEnd,
        place1: this.formatString(this.state.poi1),
        place2: this.formatString(this.state.poi2),
        place3: this.formatString(this.state.poi3),
        place4: this.formatString(this.state.poi4)
      })
      .then(result => {
        console.log("Create record successful");

        var docRef = this.props.db.collection("trips").doc(result.id);

        this.getCoordinates(this.state.city, this.state.country, docRef);
        this.getImageUrl(this.state.city, docRef);

        console.log(
          "Successfully saved record for " +
            this.state.city +
            " " +
            this.state.country
        );
        this.resetCreateForm();
        this.setState({ city: "", country: "" });
        // close the create modal & reset form
        const modal = document.querySelector("#modal-create");
        this.setState({ poi1: "", poi2: "", poi3: "", poi4: "" });

        M.Modal.getInstance(modal).close();

        // 1. Refresh the UI - cardsUpdated: TravelCards()
        this.props.refreshCards();
        // 2. Get Coordinates for this location - Async operation - store on return
        //       this.getCoordinates(this.state.city, this.state.country, docRef );
        // 3. Get Image Url for this location - Async operation - store on return
        //this.getImageUrl(this.state.city, docRef);

        //this.props.refresh();
        //        this.createForm.reset();
      })
      .catch(err => {
        console.log(err.message);
        alert("Error saving document " + err.message);
      });
  };

  render() {
    return (
      <div id="modal-create" className="modal">
        <div className="modal-content">
          <SimpleModal
            displayModal={this.state.simpleModal}
            closeModal={this.selectSimpleModal}
            message="Invalid destination specified, please select from available options"
          />

          <form
            autoComplete="off"
            id="create-form"
            onSubmit={this.handleSubmit}
          >
            <PickDate
              setDates={this.setDates}
              minStartDate={this.props.minStartDate}
              excludeDates={this.props.excludeDates}
              ref={this.pickDate}
            />
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
                  id="create_poi1"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi1"
                />

                <label htmlFor="create_poi1">Place of Interest 1</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="create_poi2"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi2"
                />
                <label htmlFor="create_poi2">Place of Interest 2</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="create_poi3"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi3"
                />
                <label htmlFor="create_poi3">Place of Interest 3</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="create_poi4"
                  className="materialize-textarea"
                  onChange={this.handlePlaceChange}
                  name="poi4"
                />
                <label htmlFor="create_poi4">Place of Interest 4</label>
              </div>
            </div>

            <button className="button btn yellow darken-2 z-depth-1 waves-effect waves-light">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

//export default U_create;
const mapStateToProps = state => {
  return { cards: state.cards };
};
export default connect(
  mapStateToProps,
  { refreshCards }
)(U_create);
