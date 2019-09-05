import React from "react";
import NavBar from "./components/NavBar";
import TravelPlan from "./components/TravelPlan";
import TravelCards from "./components/TravelCards";
import { DB_CONFIG } from "./config/config";
import app from "firebase/app";
import Flash from "./components/Flash";
import Update from "./components/U_update";
import Delete from "./components/U_delete";
import "./components/Flash.css";
import "firebase/auth";
import "firebase/firestore";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    app.initializeApp(DB_CONFIG);
    this.db = app.firestore();
    this.auth = app.auth();
    this.navBar = React.createRef();
    this.modalDelete = React.createRef();
    this.modalUpdate = React.createRef();
    this.travelCards = React.createRef();
    this.travelPlan = React.createRef();
  }
  state = {
    user: "",
    isLoggedIn: false,
    auth: null,
    db: null,
    flashMessage: "Welcome to Travel Planner - please log in to begin",
    menuOptions: [],
    tripDates: [],
    citySelected: "",
    countrySelected: "",
    excludeDates: [],
    minStartDate: ""
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
  setPlace = city => {
    this.setState({ citySelected: city });
    // Get local info for this place
    this.refs.travelPlan.setPlace(city, this.state.countrySelected);
  };

  setIsLoggedIn = isLoggedIn => {
    this.setState({ isLoggedIn: isLoggedIn });
  };

  setMenuOptions = (list, country, imageUrl) => {
    // A list of locations to be added to the navbar and sidebar
    this.setState({
      menuOptions: list,
      imageUrl: imageUrl,
      citySelected: list[0],
      countrySelected: country
    });
    // Get local info for this place
    this.refs.travelPlan.setPlace(list[0], country);
  };

  setRefresh = () => {
    this.travelCards.current.updateCards();
    this.setState({ refresh: true });
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
    } else {
      console.log("Delete failed");
    }
  };

  // This will trigger the delete process
  deleteTrip = tripRecord => {
    // The ref must be called with the "current" attribute!!!
    this.modalDelete.current.setPlaceDelete(tripRecord);
    //this.setState({ deleteInProgress: true });
  };
  // This will trigger the update process
  updateTrip = tripRecord => {
    // The ref must be called with the "current" attribute!!!
    this.modalUpdate.current.setPlaceUpdate(tripRecord);
  };

  componentDidUpdate() {
    if (this.state.refresh === true) {
      this.setState({ refresh: false });
    }
  }
  render() {
    return (
      <div className="App-main">
        <NavBar
          ref={this.navBar}
          setFlashMessage={this.setFlashMessage}
          setState={this.updateAuthState}
          isLoggedIn={this.state.isLoggedIn}
          setIsLoggedIn={this.setIsLoggedIn}
          menuOptions={this.state.menuOptions}
          imageUrl={this.state.imageUrl}
          auth={this.auth}
          db={this.db}
          excludeDates={this.state.excludeDates}
          minStartDate={this.state.minStartDate}
          tripDates={this.state.tripDates}
          setUser={this.setUser}
          setPlace={this.setPlace}
          refresh={this.setRefresh}
        />

        {/* <Seed db={this.db} /> */}
        <Flash message={this.state.flashMessage} />
        <div className={this.state.isLoggedIn ? "show" : "hide"}>
          <Delete
            ref={this.modalDelete}
            db={this.db}
            deleteCompleted={this.deleteCompleted}
          />
          <Update
            ref={this.modalUpdate}
            db={this.db}
            refresh={this.setRefresh}
          />

          <TravelCards
            ref={this.travelCards}
            setMenuOptions={this.setMenuOptions}
            setCountry={this.setCountry}
            setTripDates={this.setTripDates}
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
            db={this.db}
            performDelete={this.deleteTrip}
            performUpdate={this.updateTrip}
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

export default App;
