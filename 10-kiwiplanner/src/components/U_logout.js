import React, { Component } from "react";
import M from "materialize-css";
import "./U_logout.css";

class U_logout extends Component {
  constructor(props) {
    super(props);
    this.logoutModal = React.createRef();
    this.logoutForm = React.createRef();
  }
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, {});
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    // log the user out
    this.props.auth.signOut();
    const modal = document.querySelector("#modal-logout");
    this.props.setIsLoggedIn(false);
    M.Modal.getInstance(modal).close();
  };

  render() {
    return (
      <div id="modal-logout" className="modal">
        <div className="modal-content logout">
          <h4>Logging out</h4>
          <button
            className="btn yellow darken-2 z-depth-0"
            onClick={this.handleSubmit}
          >
            Ok
          </button>
          <p className="error pink-text center-align" />
        </div>
      </div>
    );
  }
}

export default U_logout;
