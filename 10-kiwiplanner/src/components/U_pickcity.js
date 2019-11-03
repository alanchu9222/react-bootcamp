import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import "./U_pickcity.css";
import { getCities } from "./dataService";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

import "./U_pickcity.css";

export class PickCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortlist: [""],
      data: getCities(),
      selected: "Select City",
      open: false
    };
  }

  reset = () => {
    this.setState({ selected: "" });
    this.shortlistCities("");
  };

  renderOptions() {
    return this.state.shortlist.map(city => {
      return (
        <MenuItem className="menuItem" value={city} key={city} name={city}>
          {city}
        </MenuItem>
      );
    });
  }

  shortlistCities = country => {
    const countrySelected = country.slice(0, 10);
    // alert("countrySelected >>>"+this.state.data+"<<<");
    let shortlist = this.state.data.filter(
      city => city.country === countrySelected
    );
    const sl = shortlist.map(item => {
      return item.name;
    });

    this.setState({ shortlist: sl.sort() });
  };

  handleChange = event => {
    this.setState({ selected: event.target.value });
    this.props.setDestination(event.target.value);
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="selectOptions">
          <InputLabel>City/Airport</InputLabel>
          <Select
            className="citySelector"
            value={this.state.selected}
            onChange={this.handleChange}
            inputProps={{
              name: "city",
              id: "city"
            }}
          >
            {this.renderOptions()}
          </Select>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default PickCity;
