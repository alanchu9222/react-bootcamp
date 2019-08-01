import React from "react";
import NavBar from "./components/NavBar";
import SlideMenu from "./components/SlideMenu";
import TravelPlan from "./components/TravelPlan";

import "./App.css";

class App extends React.Component {
  state = {
    current_user: "",
    current_state: "logged-out",
    view_mode: 0
  };
  //
  // This call back function gets the current state from the back end
  // when triggered by the user and is used to inform the rendering
  // components on how to present the information
  //
  updateAuthState = newState => {
    this.setState({
      current_user: newState.user,
      current_state: newState.state
    });
  };
  render() {
    return (
      <div>
        <NavBar setState={this.updateAuthState} />
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
