import { connect } from "react-redux";
import {
  setCardsVisible,
  loadDataExternal,
  placesInitialise,
  saveDataLocalStorage,
  initialiseFirebase
} from "./actions";
import {BrowserRouter} from 'react-router-dom'
import React from "react";
import NavBar from "./components/NavBar";
import TravelPlan from "./components/TravelPlan";
import TravelCards from "./components/TravelCards";
import Instructions from "./components/Instructions";

import { DB_CONFIG } from "./config/config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Flash from "./components/Flash";
import Update from "./components/U_update";
import Delete from "./components/U_delete";
import "./components/Flash.css";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    app.initializeApp(DB_CONFIG);
    this.db = app.firestore();
    this.auth = app.auth();
    this.props.initialiseFirebase(this.db, this.auth);
    this.navBar = React.createRef();
  }
  state = {
    user: "",
    auth: null,
    db: null,
    flashMessage: "Welcome to the Local Travel Guide - please log in to begin",
    tripDates: [],
    countrySelected: "",
    excludeDates: [],
    minStartDate: "",
    cardsVisible: true
  };

  setTripDates = dates => {
    // Each date element is a pair of startdate and enddate objects
    this.setState({ tripDates: dates });
  };

  setUser = user => {
    this.setState({ user: user });
  };
  setFlashMessage = message => {
    this.setState({ flashMessage: message });
  };

  componentDidMount() {
    this.props.placesInitialise();
  }

  componentDidUpdate(prevProps) {
    if (this.state.refresh === true) {
      this.setState({ refresh: false });
    }
    //    SAVE_LOCALSTORAGE - if a key is provided, then save the local storage
    if (this.props.places.updateLocalStorage) {
      this.props.saveDataLocalStorage(
        this.props.places.updateLocalStorage,
        this.props.places.currentData
      );
    }
  }
  render() {
    return (
      <BrowserRouter>
      <div className="App-main">
        <NavBar
          ref={this.navBar}
          setState={this.updateAuthState}
          setFlashMessage={this.setFlashMessage}
          cardsVisible={this.state.cardsVisible}
          imageUrl={this.state.imageUrl}
          excludeDates={this.state.excludeDates}
          minStartDate={this.state.minStartDate}
          tripDates={this.state.tripDates}
          setUser={this.setUser}
        />
        <Flash message={this.state.flashMessage} />
        <div className={this.props.firebase.isLoggedIn ? "hide" : "show"}>
          <Instructions />
        </div>
        <div className={this.props.firebase.isLoggedIn ? "show" : "hide"}>
          <Delete/>
          <Update/>

          <TravelCards
            setTripDates={this.setTripDates}
            user={this.state.user}
          />
          <TravelPlan
            className="travel-plan"
            ref="travelPlan"
            user={this.state.user}
          />
        </div>
      </div>

      </BrowserRouter>
    );
  }
}

//export default App;

const mapStateToProps = state => {
  return { cards: state.cards, places: state.places, firebase: state.firebase };
};
export default connect(
  mapStateToProps,
  {
    setCardsVisible,
    loadDataExternal,
    placesInitialise,
    saveDataLocalStorage,
    initialiseFirebase
  }
)(App);
