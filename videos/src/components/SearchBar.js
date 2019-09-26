import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };
  inputChangeHandler = event => {
    this.setState({ term: event.target.value });
  };
  formSubmitHandler = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.term);
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.formSubmitHandler} className="ui form">
          <div className="field">
            <label>Video Search</label>
            <input
              type="text"
              onChange={this.inputChangeHandler}
              value={this.state.term}
            />
          </div>
        </form>
      </div>
    );
  }
}
export default SearchBar;
