import React from "react";
import "./App.css";
import { getCountry } from "./dataservice";
import { Select, MenuItem } from "@material-ui/core";
const data = [
  {name: 'Afghanistan', code: 'AF'},{name: 'Åland Islands', code: 'AX'},{name: 'Albania', code: 'AL'},{name: 'Algeria', code: 'DZ'},{name: 'American Samoa', code: 'AS'},{name: 'AndorrA', code: 'AD'},{name: 'Angola', code: 'AO'}, {name: 'Anguilla', code: 'AI'},{name: 'Antarctica', code: 'AQ'},{name: 'Antigua and Barbuda', code: 'AG'},{name: 'Argentina', code: 'AR'}, {name: 'Armenia', code: 'AM'},{name: 'Aruba', code: 'AW'}, {name: 'Australia', code: 'AU'},{name: 'Austria', code: 'AT'},{name: 'Azerbaijan', code: 'AZ'},{name: 'Bahamas', code: 'BS'}, {name: 'Bahrain', code: 'BH'},{name: 'Bangladesh', code: 'BD'}, {name: 'Barbados', code: 'BB'},{name: 'Belarus', code: 'BY'}, {name: 'Belgium', code: 'BE'}, {name: 'Belize', code: 'BZ'}, {name: 'Benin', code: 'BJ'}, {name: 'Bermuda', code: 'BM'},{name: 'Bhutan', code: 'BT'},{name: 'Bolivia', code: 'BO'},{name: 'Bosnia and Herzegovina', code: 'BA'},   {name: 'Botswana', code: 'BW'},   {name: 'Bouvet Island', code: 'BV'},   {name: 'Brazil', code: 'BR'},   {name: 'British Indian Ocean Territory', code: 'IO'},   {name: 'Brunei Darussalam', code: 'BN'},   {name: 'Bulgaria', code: 'BG'},   {name: 'Burkina Faso', code: 'BF'},   {name: 'Burundi', code: 'BI'},   {name: 'Cambodia', code: 'KH'},   {name: 'Cameroon', code: 'CM'},   {name: 'Canada', code: 'CA'},   {name: 'Cape Verde', code: 'CV'},{name: 'Cayman Islands', code: 'KY'},   {name: 'Central African Republic', code: 'CF'},   {name: 'Chad', code: 'TD'}]
export default class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getCountry(),
      selected: "IN"
    };
  }

  handleChange = event => {
    alert("user selected " + event.target.value);
    this.setState({ selected: event.target.value, name: event.target.name });
  };
  renderOptions() {
    return data.map((dt, i) => {
      return (
        <MenuItem
          className="mi"
          label="Select a country"
          value={dt.name}
          key={i}
          name={dt.name}
        >
          {dt.name}
        </MenuItem>
      );
    });
  }
  render() {
    console.log(this.state.selected);
    return (
      <div className="padd50">
        <Select
          className="width50"
          value={this.state.selected}
          onChange={this.handleChange}
        >
          {this.renderOptions()}
        </Select>
        <h3>Selected Country - {this.state.selected}</h3>
      </div>
    );
  }
}
