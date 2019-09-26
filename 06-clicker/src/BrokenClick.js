import React, { Component } from "react";

class BrokenClick extends Component {
  // The constructor defines the interface.
  // All the methods in the class must be bound
  // at the constructor in order for it to be
  // included in the class
  /*
  constructor(prop) {
    super(prop);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }
  */
  //  handleClick(e) {
  //    this.setState({ clicked: true });
  //  }

  // The format below can be used instead of the constructor
  state = { clicked: false };

  // Use of fat arrow below takes care of binding to the class
  // No longer required to bind in the constructor
  handleClick = () => {
    this.setState({ clicked: true });
  };

  render() {
    return (
      <div>
        <h1>{this.state.clicked ? "Clicked!" : "Not clicked!!!"}</h1>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

export default BrokenClick;
