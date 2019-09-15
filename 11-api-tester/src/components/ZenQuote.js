import React from "react";
import axios from "axios";

class ZenQuote extends React.Component {
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
        <h1>Always remember...</h1>
        <p>{this.state.zenquote}</p>
      </div>
    );
  }
}
export default ZenQuote;
