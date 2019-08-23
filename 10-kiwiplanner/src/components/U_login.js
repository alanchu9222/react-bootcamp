import React, { Component } from "react";
import M from "materialize-css";

class U_login extends Component {
  constructor(props) {
    super(props);
    this.loginModal = React.createRef();
    this.loginForm = React.createRef();
    this.state = {
      email: "",
      password: ""
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

    // log the user in
    this.props.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // close the signup modal & reset form
        const modal = document.querySelector("#modal-login");
        this.props.setIsLoggedIn(true);
        M.Modal.getInstance(modal).close();
        this.loginForm.current.reset();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div id="modal-login" className="modal" ref={this.loginModal}>
        <div className="modal-content">
          <h4>Sign In</h4>

          <form
            id="login-form"
            ref={this.loginForm}
            onSubmit={this.handleSubmit}
          >
            <div className="input-field">
              <input
                type="email"
                onChange={this.handleChangeEmail}
                value={this.state.email}
                id="login-email"
                required
              />
              <label htmlFor="login-email">Email address</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                onChange={this.handleChangePassword}
                value={this.state.password}
                id="login-password"
                required
              />
              <label htmlFor="login-password">Your password</label>
            </div>
            <button className="btn yellow darken-2 z-depth-0">Login</button>
            <p className="error pink-text center-align" />
          </form>
        </div>
      </div>
    );
  }
}

export default U_login;
