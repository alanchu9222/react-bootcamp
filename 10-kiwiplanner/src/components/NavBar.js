import React, { Component } from "react";
import M from "materialize-css";

class NavBar extends Component {
  static defaultProps = {
    menuItems: [
      {
        id: "",
        target: "modal-view",
        description: "View Mode",
        show_when: "logged-in"
      },
      {
        id: "logout",
        target: "",
        description: "Logout",
        show_when: "logged-in"
      },
      {
        id: "",
        target: "modal-create",
        description: "Create",
        show_when: "admin"
      },
      {
        id: "",
        target: "modal-login",
        description: "Login",
        show_when: "logged-out"
      },
      {
        id: "",
        target: "modal-signup",
        description: "Sign Up",
        show_when: "logged-out"
      }
    ]
  };

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, {});
    });
    console.log(this.props.menuItems);
    console.log(this.props.menuItems[0].id);
  }
  render() {
    return (
      <div>
        <nav className="z-depth-0 teal lighten-4">
          <div className="nav-wrapper container">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className="logged-in">
                <span
                  className="z-depth-0 teal lighten-4 grey-text waves-effect waves-light btn modal-trigger"
                  data-target={this.props.menuItems[0].target}
                >
                  {this.props.menuItems[0].description}
                </span>
              </li>
              <li className="logged-in">
                <span
                  className="z-depth-0 teal lighten-4 grey-text waves-effect waves-light btn modal-trigger"
                  data-target="logout"
                >
                  Logout
                </span>
              </li>
              <li className="admin">
                <span
                  className="z-depth-0 teal lighten-4 grey-text waves-effect waves-light btn modal-trigger"
                  data-target="modal-create"
                >
                  Create Guide
                </span>
              </li>
              <li className="logged-out">
                <span
                  className="z-depth-0 teal lighten-4 grey-text waves-effect waves-light btn modal-trigger"
                  data-target="modal-login"
                >
                  Login
                </span>
              </li>
              <li className="logged-out">
                <span
                  className="z-depth-0 teal lighten-4 grey-text waves-effect waves-light btn modal-trigger"
                  data-target="modal-signup"
                >
                  Sign up
                </span>
              </li>
            </ul>
          </div>
        </nav>

        <div id="modal-account" className="modal">
          <div className="modal-content">
            <h4>Account</h4>
          </div>
        </div>
        <div id="modal-login" className="modal">
          LOGIN
        </div>
        <div id="modal-account" className="modal">
          ACCOUNT
        </div>
        <div id="modal-create" className="modal">
          CREATE
        </div>
        <div id="modal-signup" className="modal">
          CREATE
        </div>
      </div>
    );
  }
}

export default NavBar;
