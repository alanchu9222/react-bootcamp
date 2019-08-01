import React from "react";
import NavBar from "./components/NavBar";
import SlideMenu from "./components/SlideMenu";
import TravelPlan from "./components/TravelPlan";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <SlideMenu />
        <TravelPlan />
      </div>
    );
  }
}

export default App;
