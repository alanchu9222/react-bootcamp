import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };
  handleUserInput = event => {
    this.setState({ term: event.target.value });
  };
  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.handleFormSubmit}>
          <div className="field">
            <label>Search Bar</label>
            <input
              type="text"
              onChange={this.handleUserInput}
              value={this.state.term}
            ></input>
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
