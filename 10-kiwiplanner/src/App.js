import React from "react";
import NavBar from "./components/NavBar";
import TravelPlan from "./components/TravelPlan";
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
    current_user: "",
    isLoggedIn: false,
    view_mode: 0,
    auth: null,
    db: null
  };

  //
  // This call back function gets the current state from the back end
  // when triggered by the user and is used to inform the rendering
  // components on how to present the information
  //
  updateAuthState = newState => {
    this.setState({
      current_user: newState.user,
      logged_in: newState.logged_in
    });
  };
  render() {
    return (
      <div>
        <NavBar
          setState={this.updateAuthState}
          isLoggedIn={this.state.isLoggedIn}
          auth={this.auth}
        />

        <TravelPlan
          user={this.state.current_user}
          viewmode={this.state.view_mode}
          authState={this.state.current_state}
        />
      </div>
    );
  }
}

export default App;
