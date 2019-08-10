import React from "react";
import NavBar from "./components/NavBar";
import TravelPlan from "./components/TravelPlan";
import TravelCards from "./components/TravelCards";
import { DB_CONFIG } from "./config/config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
    view_mode: "0",
    auth: null,
    db: null,
    refresh: false,
    tripselected: {
      city: "",
      poi1: "",
      poi2: "",
      poi3: "",
      poi4: ""
    }
  };
  setIsLoggedIn = isLoggedIn => {
    this.setState({ isLoggedIn: isLoggedIn });
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
            auth={this.auth}
            db={this.db}
            refresh={this.setRefresh}
          />
        }

        {this.state.isLoggedIn ? (
          <div>
            <TravelCards user={this.state.user} />

            <TravelPlan user={this.state.user} auth={this.auth} db={this.db} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;

{
  /* <TravelCards user={this.state.user} />*/
}
