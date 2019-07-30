import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

class App extends React.Component {
  state = { images: [] };
  onSearchSubmit = async term => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: term },
      headers: {
        Authorization:
          "Client-ID 8c968c529c285c7fa3b0a67aa3c6dd190d9cf46fb4965211960ad3e5c3e1ee4b"
      }
    });
    this.setState({ images: response.data.results });
    console.log(response.data.results);
  };
  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        Found {this.state.images.length} results!
      </div>
    );
  }
}

export default App;
