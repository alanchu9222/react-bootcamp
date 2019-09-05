import React, { Component } from "react";
import SimpleModal from "./SimpleModal";
import "./SimpleModal.css";
import "./U_signup.css";

import M from "materialize-css";

class U_signup extends Component {
  constructor(props) {
    super(props);
    this.signupModal = React.createRef();
    this.signupForm = React.createRef();
    this.state = {
      email: "",
      password: "",
      error_message: ""
    };
  }
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, {});
    });
  }

  handleChangeEmail = e => {
    console.log(this.state.email);
    this.setState({ email: e.target.value });
  };
  handleChangePassword = e => {
    this.setState({ password: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    // get user info
    const email = this.state.email;
    const password = this.state.password;

    // Signup user
    this.props.auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred.user);
        // close the signup modal & reset form
        const modal = document.querySelector("#modal-login");
        this.props.setIsLoggedIn(false);
        M.Modal.getInstance(modal).close();
        this.signupForm.current.reset();
      })
      .catch(err => {
        this.selectSimpleModal(err.message);
      });
  };
  selectSimpleModal = info => {
    this.setState({ error_message: info });
    this.setState({ simpleModal: !this.state.simpleModal }); // true/false toggle
  };

  render() {
    return (
      <div id="modal-signup" className="modal" ref={this.signupModal}>
        <div className="modal-content">
          <h4>Sign Up</h4>
          <SimpleModal
            displayModal={this.state.simpleModal}
            closeModal={this.selectSimpleModal}
            message={this.state.error_message}
          />
          <form
            id="signup-form"
            ref={this.signupForm}
            onSubmit={this.handleSubmit}
          >
            <div className="input-field">
              <input
                type="email"
                onChange={this.handleChangeEmail}
                value={this.state.email}
                id="signup-email"
                required
              />
              <label htmlFor="signup-email">Email address</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                onChange={this.handleChangePassword}
                value={this.state.password}
                id="signup-password"
                required
              />
              <label htmlFor="signup-password">Your password</label>
            </div>
            <button className="btn yellow darken-2 z-depth-0">Register</button>
            <p className="error pink-text center-align" />
          </form>
        </div>
      </div>
    );
  }
}

export default U_signup;
