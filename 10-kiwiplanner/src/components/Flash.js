import React from "react";
import "./Flash.css";
// Refer to https://www.npmjs.com/package/react-flash-message
import FlashMessage from "react-flash-message";

class Flash extends React.Component {
  render() {
    return (
      <div className="container">
        <FlashMessage duration={6000}>
          <div className="flash">{this.props.message}</div>
        </FlashMessage>
      </div>
    );
  }
}

export default Flash;
