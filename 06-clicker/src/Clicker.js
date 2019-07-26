import React, { Component } from "react";
const maxNum = 10;
const winningNum = 7;

class Clicker extends Component {
  state = { clicked: false, number: 0, isWinner: false };
  randomGen = () => {
    let rand = Math.floor(Math.random() * maxNum) + 1;
    this.setState({ number: rand });
    if (winningNum === rand) {
      this.setState({ isWinner: true });
    }
  };

  render() {
    return (
      <div>
        <h1>Number is {this.state.number}</h1>
        {this.state.isWinner ? (
          <h1>YOU WIN!!!</h1>
        ) : (
          <button onClick={this.randomGen}>Random Number</button>
        )}
      </div>
    );
  }
}

export default Clicker;
