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
import Seed from "./seed/seed";
import "./App.css";
import "toasted-notes/src/styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    app.initializeApp(DB_CONFIG);
    this.db = app.firestore();
    this.auth = app.auth();
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
    flashMessage: "Welcome to Travel Planner - please sign in to begin",
    menuOptions: [],
    citySelected: "",
    countrySelected: "",
    // This will trigger cards update when a trip is deleted
    deleteInProgress: false
  };

  setUser = user => {
    this.setState({ user: user });
  };
  setPlace = city => {
    //    toast.notify('User selected '+ city)
    this.setState({ citySelected: city });
    // Get local info for this place
    this.refs.travelPlan.setPlace(city, this.state.countrySelected);
  };

  setIsLoggedIn = isLoggedIn => {
    this.setState({ isLoggedIn: isLoggedIn });
  };

  setMenuOptions = (list, country) => {
    // A list of locations to be added to the navbar and sidebar
    this.setState({
      menuOptions: list,
      citySelected: list[0],
      countrySelected: country
    });
    // Get local info for this place
    this.refs.travelPlan.setPlace(list[0], country);
  };

  setRefresh = () => {
    console.log("Refresh called");
    this.setState({ refresh: true });
  };
  setFlashMessage = message => {
    this.setState({ flashMessage: message });
  };

  deleteCompleted = result => {
    // This will trigger the trips desplayed to be updates
    this.setState({ deleteInProgress: false });
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
    this.setState({ deleteInProgress: true });
  };

  componentDidUpdate() {
    if (this.state.refresh === true) {
      this.setState({ refresh: false });
    }
  }
  render() {
    return (
      <div>
        <NavBar
          setFlashMessage={this.setFlashMessage}
          setState={this.updateAuthState}
          isLoggedIn={this.state.isLoggedIn}
          setIsLoggedIn={this.setIsLoggedIn}
          menuOptions={this.state.menuOptions}
          auth={this.auth}
          db={this.db}
          setUser={this.setUser}
          setPlace={this.setPlace}
          refresh={this.setRefresh}
        />

        {/* <Seed db={this.db} /> */}
        <Flash message={this.state.flashMessage} />
        {this.state.isLoggedIn ? (
          <div>
            <Delete
              ref={this.modalDelete}
              db={this.db}
              deleteCompleted={this.deleteCompleted}
            />
            <Update
              ref="modal-update"
              setFlashMessage={this.props.setFlashMessage}
              setIsLoggedIn={this.props.setIsLoggedIn}
              id="modal-update"
              refresh={this.props.refresh}
              db={this.props.db}
            />

            <TravelCards
              ref={this.travelCards}
              setMenuOptions={this.setMenuOptions}
              setCountry={this.setCountry}
              user={this.state.user}
              isLoggedIn={this.state.isLoggedIn}
              db={this.db}
              performDelete={this.deleteTrip}
            />

            <TravelPlan
              ref="travelPlan"
              user={this.state.user}
              auth={this.auth}
              db={this.db}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
