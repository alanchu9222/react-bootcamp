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
    user: "",
    isLoggedIn: false,
    view_mode: 0,
    auth: null,
    db: null
  };
  setIsLoggedIn = isLoggedIn => {
    this.setState({ isLoggedIn: isLoggedIn });
  };

  render() {
    return (
      <div>
        {
          <NavBar
            setState={this.updateAuthState}
            isLoggedIn={this.state.isLoggedIn}
            setIsLoggedIn={this.setIsLoggedIn}
            auth={this.auth}
          />
        }
        {this.state.isLoggedIn && this.state.view_mode == 0 ? (
          <TravelPlan user={this.state.user} />
        ) : (
          <div />
        )}
        {this.state.isLoggedIn && this.state.view_mode == 1 ? (
          <TravelCards user={this.state.user} />
        ) : (
          <div />
        )}
        }
      </div>
    );
  }
}

export default App;
