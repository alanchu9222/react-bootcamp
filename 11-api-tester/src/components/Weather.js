import React from "react";
import axios from "axios";
// Open-weather KEY
// c6dd7c2aa863d2f936a3056172dffce8
// Example
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}
// For melbourne

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zenquote: ""
    };
  }
  componentDidMount() {
    console.log("hello Zenquote");
    // load data
    axios.get("https://api.github.com/zen").then(response => {
      this.setState({ zenquote: response.data });
    });
    //set state with data
  }

  render() {
    return (
      <div>
        <h1>Todays weather...</h1>
        <p>{this.state.zenquote}</p>
      </div>
    );
  }
}
export default Weather;
