import React, { Component } from "react";
import M from "materialize-css";

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
    this.logoutForm.current.reset();
  };

  render() {
    return (
      <div id="modal-logout" className="modal" ref={this.loginModal}>
        <div className="modal-content">
          <h4>You are now logged out</h4>

          <form
            id="logout-form"
            ref={this.logoutForm}
            onSubmit={this.handleSubmit}
          >
            <button className="btn yellow darken-2 z-depth-0">Ok</button>
            <p className="error pink-text center-align" />
          </form>
        </div>
      </div>
    );
  }
}

export default U_logout;
