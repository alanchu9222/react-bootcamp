import React from "react";
import NavBar from "./components/NavBar";
import TravelPlan from "./components/TravelPlan";
import TravelCards from "./components/TravelCards";
import { DB_CONFIG } from "./config/config";
import app from "firebase/app";
import Flash from "./components/Flash";
import "./components/Flash.css";
import "firebase/auth";
import "firebase/firestore";
import Seed from "./seed/seed";
import "./App.css";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    app.initializeApp(DB_CONFIG);
    this.db = app.firestore();
    this.auth = app.auth();
  }
  state = {
    user: "",
    isLoggedIn: false,
    auth: null,
    db: null,
    flashMessage: "Welcome to Travel Planner - please sign in to begin",
    menuOptions: [],
    citySelected: "",
    countrySelected: ""
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

  componentDidUpdate() {
    if (this.state.refresh === true) {
      this.setState({ refresh: false });
    }
  }
  render() {
    return (
      <div>
        {
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
        }

        {/* <Seed db={this.db} /> */}
        <Flash message={this.state.flashMessage} />
        {this.state.isLoggedIn ? (
          <div>
            <TravelCards
              setMenuOptions={this.setMenuOptions}
              setCountry={this.setCountry}
              user={this.state.user}
              isLoggedIn={this.state.isLoggedIn}
              db={this.db}
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
