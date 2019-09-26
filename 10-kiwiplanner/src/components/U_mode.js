import React, { Component } from "react";
import M from "materialize-css";

class U_mode extends Component {
  static defaultProps = {
    target: ""
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // login
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      // get user info
      const email = loginForm["login-email"].value;
      const password = loginForm["login-password"].value;

      // log the user in
      this.props.auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal & reset form
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
      });
    });
  }

  render() {
    if (
      this.props.target
        .trim()
        .toUpperCase()
        .includes("LOGIN")
    ) {
      return (
        <div>
          <form id="login-form">
            <div class="input-field">
              <input type="email" id="login-email" required />
              <label for="login-email">Email address</label>
            </div>
            <div class="input-field">
              <input type="password" id="login-password" required />
              <label for="login-password">Your password</label>
            </div>
            <button class="btn yellow darken-2 z-depth-0">Login</button>
            <p class="error pink-text center-align" />
          </form>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default U_mode;
