import React, { Component } from "react";
import Login from "./U_login";
import Logout from "./U_logout";
import Create from "./U_create";
import Mode from "./U_mode";
import Signup from "./U_signup";

import M from "materialize-css";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  static defaultProps = {
    auth: null,
    menuItems: [
      {
        list_id: "mode",
        menu_id: "",
        target: "modal-view",
        description: "View Mode",
        show_when: "logged-in"
      },
      {
        list_id: "logout",
        menu_id: "logout",
        target: "modal-logout",
        description: "Logout",
        show_when: "logged-in"
      },
      {
        list_id: "create",
        menu_id: "",
        target: "modal-create",
        description: "Create Plan",
        show_when: "logged-in",
        component: "Login"
      },
      {
        list_id: "login",
        menu_id: "",
        target: "modal-login",
        description: "Login",
        show_when: "logged-out"
      },
      {
        list_id: "signup",
        menu_id: "",
        target: "modal-signup",
        description: "Sign Up",
        show_when: "logged-out"
      }
    ]
  };

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      //      const elems = document.querySelectorAll(".modal");
      //      M.Modal.init(elems, {});
      const sideNav = document.querySelector(".sidenav");
      M.Sidenav.init(sideNav, {});
    });
  }

  setIsLoggedIn = isLoggedIn => {
    this.setState({ isLoggedIn: isLoggedIn });
    this.props.setIsLoggedIn(isLoggedIn);
  };
  showMenuItem = menuItem => {
    return (
      <li key={menuItem.list_id} className="{menuItem.show_when}">
        <span
          className="z-depth-0 teal lighten-4 grey-text waves-effect waves-light btn modal-trigger"
          data-target={menuItem.target}
          id={menuItem.menu_id}
        >
          {menuItem.description}
        </span>
      </li>
    );
  };
  showSideMenuItem = menuItem => {
    return (
      <li key={menuItem.list_id}>
        <span
          className="z-depth-0 white grey-text waves-effect waves-light btn modal-trigger"
          data-target={menuItem.target}
          id={menuItem.menu_id}
        >
          {menuItem.description}
        </span>
      </li>
    );
  };

  currentMenuItems = () => {
    console.log("Show current login status");
    console.log(this.props);
    const mode = this.props.isLoggedIn ? "logged-in" : "logged-out";
    return this.props.menuItems.filter(a => a.show_when === mode);
  };

  render() {
    return (
      <div>
        <nav className="z-depth-0 teal lighten-4">
          <div className="nav-wrapper">
            <span data-target="mobile-nav" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </span>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.currentMenuItems().map(this.showMenuItem)}
            </ul>
          </div>
        </nav>

        <Login
          setIsLoggedIn={this.setIsLoggedIn}
          id="modal-login"
          auth={this.props.auth}
        />
        <Logout
          setIsLoggedIn={this.setIsLoggedIn}
          id="modal-logout"
          auth={this.props.auth}
        />

        {/*
        {this.props.menuItems.map(menuItem => (
          <div
            key={menuItem.list_id}
            ref={this.getRef(menuItem)}
            id={menuItem.target}
            className="modal"
          >
            <div className="modal-content">
              <h4>{menuItem.description}</h4>
              {this.showModalContent(menuItem, this.getRef(menuItem))}
            </div>
          </div>
        ))}
        */}

        <ul className="sidenav" id="mobile-nav">
          {this.currentMenuItems().map(this.showSideMenuItem)}
        </ul>
      </div>
    );
  }
}

export default NavBar;
