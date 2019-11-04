import { connect } from "react-redux";
import {
  setCardsVisible,
  loadDataExternal,
  placesInitialise,
  saveDataLocalStorage,
  initialiseFirebase
} from "./actions";

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
    console.log("APP INIT NOW");
    this.props.initialiseFirebase(this.db, this.auth);
    this.navBar = React.createRef();
    this.modalDelete = React.createRef();
    this.modalUpdate = React.createRef();
    this.travelCards = React.createRef();
  }
  state = {
    user: "",
    auth: null,
    db: null,
    flashMessage: "Welcome to the Local Travel Guide - please log in to begin",
    menuOptions: [],
    tripDates: [],
    citySelected: "",
    countrySelected: "",
    excludeDates: [],
    minStartDate: "",
    cardsVisible: true
  };

  setTripDates = dates => {
    // Each date element is a pair of startdate and enddate objects
    this.setState({ tripDates: dates });
    //  const minStartDate = this.configureDatePicker(dates);
    //  this.navBar.current.initDatePicker(minStartDate);
  };
  configureDatePicker = dates => {
    const OneDay = 1000 * 60 * 60 * 24;
    const today = new Date();
    const excludeDates = this.getExcludeDates(dates);
    let minStartDate = "";
    this.setState({ excludeDates: excludeDates });
    // If the the first exclude date on the list greater than today
    // then we allow today to be the earliest date otherwise, step through
    // the exclude days until there is a gap - then make that gap day the next
    // available day for the date picker
    if (excludeDates.length === 0) {
      minStartDate = today;
    } else if (today.getTime() < excludeDates[0].getTime()) {
      minStartDate = today;
    } else {
      for (
        let i = excludeDates[0].getTime();
        i <= excludeDates[excludeDates.length - 1].getTime();
        i = i + OneDay
      ) {
        // i is the right date if it is not in the excludeDates
        const result = excludeDates.filter(d => {
          const iMinus = i - OneDay / 2;
          const iPlus = i + OneDay / 2;

          return d.getTime() > iMinus && d.getTime() < iPlus;
        });
        // No matches then this is a valid minimum start date
        if (result.length === 0) {
          minStartDate = Date(i);
        }
      }
      if (!minStartDate) {
        minStartDate = excludeDates[excludeDates.length - 1];
      }
    }
    this.setState({ minStartDate: minStartDate });
    return minStartDate;
  };

  getExcludeDates = tripDates => {
    let dates = [];
    const oneDay = 1000 * 60 * 60 * 24;
    // Run through all the trips and load each day of travel to the dates array
    tripDates.forEach(trip => {
      for (
        let i = trip.start.getTime();
        i <= trip.end.getTime();
        i = i + oneDay
      ) {
        dates.push(new Date(i));
      }
    });

    // Remove days that have passed from the array
    const today = new Date();
    const halfDay = oneDay / 2;
    dates = dates.filter(date => {
      return date.getTime() >= today.getTime() - halfDay;
    });

    // Sort the dates
    dates.sort((a, b) => {
      const aTime = a.getTime();
      const bTime = b.getTime();
      return aTime < bTime ? -1 : aTime > bTime ? 1 : 0;
    });

    return dates;
  };

  setUser = user => {
    this.setState({ user: user });
  };
  setFlashMessage = message => {
    this.setState({ flashMessage: message });
  };

  deleteCompleted = result => {
    // This will trigger the trips displayed to be updated
    //this.setState({ deleteInProgress: false });
    if (result) {
      console.log("Delete succesful");
      this.travelCards.current.updateCards();
      this.setState({ menuOptions: [] });
    } else {
      console.log("Delete failed");
    }
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
      <div className="App-main">
        <NavBar
          ref={this.navBar}
          setState={this.updateAuthState}
          setFlashMessage={this.setFlashMessage}
          cardsVisible={this.state.cardsVisible}
          menuOptions={this.state.menuOptions}
          imageUrl={this.state.imageUrl}
          auth={this.auth}
          db={this.db}
          excludeDates={this.state.excludeDates}
          minStartDate={this.state.minStartDate}
          tripDates={this.state.tripDates}
          setUser={this.setUser}
          // setPlace={this.setPlace}
          //refresh={this.setRefresh}
        />
        <Flash message={this.state.flashMessage} />
        <div className={this.props.firebase.isLoggedIn ? "hide" : "show"}>
          <Instructions />
        </div>
        <div className={this.props.firebase.isLoggedIn ? "show" : "hide"}>
          <Delete
            ref={this.modalDelete}
            db={this.db}
            deleteCompleted={this.deleteCompleted}
          />
          <Update
            ref={this.modalUpdate}
            db={this.db}
            //refresh={this.setRefresh}
            //updateCompleted={this.updateCompleted}
          />

          <TravelCards
            ref={this.travelCards}
            // setCountry={this.setCountry}
            setTripDates={this.setTripDates}
            user={this.state.user}
            db={this.db}
          />
          <TravelPlan
            className="travel-plan"
            ref="travelPlan"
            user={this.state.user}
            auth={this.auth}
            db={this.db}
          />
        </div>
      </div>
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
