import React from "react";
import ZenQuote from "./components/ZenQuote";
import Weather from "./components/Weather";
import ShowMap from "./components/ShowMap";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>API Tester</h1>
      <ZenQuote />
      <Weather />
    </div>
  );
}

export default App;
