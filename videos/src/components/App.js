import React from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";

class App extends React.Component {
  state = { searchTerm: "" };
  onTermSubmit = term => {
    const KEY = "AIzaSyC4CnQsYQ8YMD2JBUSVUmij5MpYLMSg6oM";
    this.setState({ searchTerm: term });
    youtube.get("/search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: KEY,
        q: term
      }
    });
  };
  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
      </div>
    );
  }
}

export default App;
