import React, { Component } from "react";
// REFER: https://github.com/moroshko/react-autosuggest
import Autosuggest from "react-autosuggest";
import "./theme.css";
import "./U_pickcity.css";

export class PickCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      isValid: false,
      value: "",
      suggestions: []
    };
  }
  reset = () => {
    this.setState({ value: "" });
  };

  setDestination = dest => {
    this.setState({ value: dest });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionSelected = (event, { suggestionValue, method }) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isValid: true });
    // Inform the parent - the value has changed
    this.props.setDestination(suggestionValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    // Value in the component state is used to render the autosuggest input field
    const { value, suggestions } = this.state;
    //const theme = themeable(this.props.theme);
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Destination country",
      spellCheck: false,
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        onSuggestionSelected={this.onSuggestionSelected}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default PickCountry;

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : countries.filter(country => country.name.toLowerCase().match(inputValue));
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;
const countries = [
  { name: "Afghanistan" },
  { name: "Albania" },
  { name: "Algeria" },
  { name: "Andorra" },
  { name: "Angola" },
  { name: "Anguilla" },
  { name: "Antigua & Barbuda" },
  { name: "Argentina" },
  { name: "Armenia" },
  { name: "Aruba" },
  { name: "Australia" },
  { name: "Austria" },
  { name: "Azerbaijan" },
  { name: "Bahamas" },
  { name: "Bahrain" },
  { name: "Bangladesh" },
  { name: "Barbados" },
  { name: "Belarus" },
  { name: "Belgium" },
  { name: "Belize" },
  { name: "Benin" },
  { name: "Bermuda" },
  { name: "Bhutan" },
  { name: "Bolivia" },
  { name: "Bosnia & Herzegovina" },
  { name: "Botswana" },
  { name: "Brazil" },
  { name: "British Virgin Islands" },
  { name: "Brunei" },
  { name: "Bulgaria" },
  { name: "Burkina Faso" },
  { name: "Burundi" },
  { name: "Cambodia" },
  { name: "Cameroon" },
  { name: "Canada" },
  { name: "Cape Verde" },
  { name: "Cayman Islands" },
  { name: "Central Arfrican Republic" },
  { name: "Chad" },
  { name: "Chile" },
  { name: "China" },
  { name: "Colombia" },
  { name: "Congo" },
  { name: "Cook Islands" },
  { name: "Costa Rica" },
  { name: "Cote D Ivoire" },
  { name: "Croatia" },
  { name: "Cuba" },
  { name: "Curacao" },
  { name: "Cyprus" },
  { name: "Czech Republic" },
  { name: "Denmark" },
  { name: "Djibouti" },
  { name: "Dominica" },
  { name: "Dominican Republic" },
  { name: "Ecuador" },
  { name: "Egypt" },
  { name: "El Salvador" },
  { name: "Equatorial Guinea" },
  { name: "Eritrea" },
  { name: "Estonia" },
  { name: "Ethiopia" },
  { name: "Falkland Islands" },
  { name: "Faroe Islands" },
  { name: "Fiji" },
  { name: "Finland" },
  { name: "France" },
  { name: "French Polynesia" },
  { name: "French West Indies" },
  { name: "Gabon" },
  { name: "Gambia" },
  { name: "Georgia" },
  { name: "Germany" },
  { name: "Ghana" },
  { name: "Gibraltar" },
  { name: "Greece" },
  { name: "Greenland" },
  { name: "Grenada" },
  { name: "Guam" },
  { name: "Guatemala" },
  { name: "Guernsey" },
  { name: "Guinea" },
  { name: "Guinea Bissau" },
  { name: "Guyana" },
  { name: "Haiti" },
  { name: "Honduras" },
  { name: "Hong Kong" },
  { name: "Hungary" },
  { name: "Iceland" },
  { name: "India" },
  { name: "Indonesia" },
  { name: "Iran" },
  { name: "Iraq" },
  { name: "Ireland" },
  { name: "Isle of Man" },
  { name: "Israel" },
  { name: "Italy" },
  { name: "Jamaica" },
  { name: "Japan" },
  { name: "Jersey" },
  { name: "Jordan" },
  { name: "Kazakhstan" },
  { name: "Kenya" },
  { name: "Kiribati" },
  { name: "Kosovo" },
  { name: "Kuwait" },
  { name: "Kyrgyzstan" },
  { name: "Laos" },
  { name: "Latvia" },
  { name: "Lebanon" },
  { name: "Lesotho" },
  { name: "Liberia" },
  { name: "Libya" },
  { name: "Liechtenstein" },
  { name: "Lithuania" },
  { name: "Luxembourg" },
  { name: "Macau" },
  { name: "Macedonia" },
  { name: "Madagascar" },
  { name: "Malawi" },
  { name: "Malaysia" },
  { name: "Maldives" },
  { name: "Mali" },
  { name: "Malta" },
  { name: "Marshall Islands" },
  { name: "Mauritania" },
  { name: "Mauritius" },
  { name: "Mexico" },
  { name: "Micronesia" },
  { name: "Moldova" },
  { name: "Monaco" },
  { name: "Mongolia" },
  { name: "Montenegro" },
  { name: "Montserrat" },
  { name: "Morocco" },
  { name: "Mozambique" },
  { name: "Myanmar" },
  { name: "Namibia" },
  { name: "Nauro" },
  { name: "Nepal" },
  { name: "Netherlands" },
  { name: "Netherlands Antilles" },
  { name: "New Caledonia" },
  { name: "New Zealand" },
  { name: "Nicaragua" },
  { name: "Niger" },
  { name: "Nigeria" },
  { name: "North Korea" },
  { name: "Norway" },
  { name: "Oman" },
  { name: "Pakistan" },
  { name: "Palau" },
  { name: "Palestine" },
  { name: "Panama" },
  { name: "Papua New Guinea" },
  { name: "Paraguay" },
  { name: "Peru" },
  { name: "Philippines" },
  { name: "Poland" },
  { name: "Portugal" },
  { name: "Puerto Rico" },
  { name: "Qatar" },
  { name: "Reunion" },
  { name: "Romania" },
  { name: "Russia" },
  { name: "Rwanda" },
  { name: "Saint Pierre & Miquelon" },
  { name: "Samoa" },
  { name: "San Marino" },
  { name: "Sao Tome and Principe" },
  { name: "Saudi Arabia" },
  { name: "Senegal" },
  { name: "Serbia" },
  { name: "Seychelles" },
  { name: "Sierra Leone" },
  { name: "Singapore" },
  { name: "Slovakia" },
  { name: "Slovenia" },
  { name: "Solomon Islands" },
  { name: "Somalia" },
  { name: "South Africa" },
  { name: "South Korea" },
  { name: "South Sudan" },
  { name: "Spain" },
  { name: "Sri Lanka" },
  { name: "St Kitts & Nevis" },
  { name: "St Lucia" },
  { name: "St Vincent" },
  { name: "Sudan" },
  { name: "Suriname" },
  { name: "Swaziland" },
  { name: "Sweden" },
  { name: "Switzerland" },
  { name: "Syria" },
  { name: "Taiwan" },
  { name: "Tajikistan" },
  { name: "Tanzania" },
  { name: "Thailand" },
  { name: "Timor L'Este" },
  { name: "Togo" },
  { name: "Tonga" },
  { name: "Trinidad & Tobago" },
  { name: "Tunisia" },
  { name: "Turkey" },
  { name: "Turkmenistan" },
  { name: "Turks & Caicos" },
  { name: "Tuvalu" },
  { name: "Uganda" },
  { name: "Ukraine" },
  { name: "United Arab Emirates" },
  { name: "United Kingdom" },
  { name: "United States of America" },
  { name: "Uruguay" },
  { name: "Uzbekistan" },
  { name: "Vanuatu" },
  { name: "Vatican City" },
  { name: "Venezuela" },
  { name: "Vietnam" },
  { name: "Virgin Islands (US)" },
  { name: "Yemen" },
  { name: "Zambia" },
  { name: "Zimbabwe" }
];
