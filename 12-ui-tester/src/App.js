import React, { Component } from "react";
import Pokegame from "./Pokegame";
import AddForm from "./components/AddForm";
import TravelPlan from "./components/TravelPlan";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TravelPlan />

        <AddForm />
        <Pokegame />
      </div>
    );
  }
}

export default App;
