import React from "react";
import NavBar from "./components/NavBar";
import TravelPlan from "./components/TravelPlan";
import TravelCards from "./components/TravelCards";
import { DB_CONFIG } from "./config/config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Seed from "./seed/seed";
import "./App.css";

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
    menuOptions: [],
    placeSelected: ""
  };
  setUser = user => {
    this.setState({ user: user });
  };
  setPlace = place => {
    this.setState({ placeSelected: place });
  };

  setIsLoggedIn = isLoggedIn => {
    this.setState({ isLoggedIn: isLoggedIn });
  };

  setMenuOptions = list => {
    // A list of locations to be added to the navbar and sidebar
    this.setState({ menuOptions: list });
  };

  setRefresh = () => {
    console.log("Refresh called");
    this.setState({ refresh: true });
  };

  componentDidUpdate() {
    if (this.state.refresh === true) {
      this.setState({ refresh: false });
    }
  }
  render() {
    console.log("APP: isLoggedIn");
    console.log(this.state.isLoggedIn);

    console.log("Refreshing the view");

    return (
      <div>
        {
          <NavBar
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

        {this.state.isLoggedIn ? (
          <div>
            <TravelCards
              setMenuOptions={this.setMenuOptions}
              user={this.state.user}
              isLoggedIn={this.state.isLoggedIn}
              db={this.db}
            />

            <TravelPlan
              user={this.state.user}
              auth={this.auth}
              db={this.db}
              place={this.state.placeSelected}
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
