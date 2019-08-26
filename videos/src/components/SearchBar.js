import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };
  inputChangeHandler = event => {};
  render() {
    return (
      <div className="search-bar ui segment">
        <form className="ui form">
          <div className="field">
            <label>Video Search</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              value={this.state.term}
            />
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
