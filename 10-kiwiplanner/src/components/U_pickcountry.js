import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import "./U_pickcountry.css";
import { getCountries } from "./dataService";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

export class PickCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: getCountries(),
      selected: "Select Country"
    };
  }

  reset = () => {
    this.setState({ selected: "" });
  };

  renderOptions() {
    return this.state.countries.map(country => {
      return (
        <MenuItem
          className="menuItem"
          value={country}
          key={country}
          name={country}
        >
          {country}
        </MenuItem>
      );
    });
  }

  handleChange = event => {
    this.setState({ selected: event.target.value });
    this.props.setDestination(event.target.value);
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div className="selectOptions">
        <InputLabel>Select Country</InputLabel>          
        <Select
          className="countrySelector"
          value={this.state.selected}
          onChange={this.handleChange}
          inputProps={{
            name: "country",
            id: "country"
          }}
        >          
          {this.renderOptions()}
        </Select>
      </div>
    </MuiThemeProvider>

    );
  }
}

export default PickCountry;

