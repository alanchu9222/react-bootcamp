import React, { Component } from "react";
import Login from "./U_login";
import Logout from "./U_logout";
import Create from "./U_create";
import SignUp from "./U_signup";
import logo from "../img/image.png";
import "./NavBar.css";
//import Mode from "./U_mode";

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
        description: "Add Destination",
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

  showMenuItem = menuItem => {
    return (
      <li key={menuItem.list_id} className="{menuItem.show_when}">
        <a
          data-target={menuItem.target}
          data-toggle="modal"
          className="z-depth-0 white-text waves-effect waves-light modal-trigger"
          id={menuItem.menu_id}
          href={menuItem.target}
        >
          {menuItem.description}
        </a>
      </li>
    );
  };
  showSideMenuItem = menuItem => {
    return (
      <li key={menuItem.list_id}>
        <a
          className="z-depth-0 black-text waves-effect waves-light modal-trigger"
          data-target={menuItem.target}
          href={menuItem.target}
          id={menuItem.menu_id}
        >
          {menuItem.description}
        </a>
      </li>
    );
  };

  currentMenuItems = () => {
    // Current menu item depends on the state of authentication
    const mode = this.props.isLoggedIn ? "logged-in" : "logged-out";
    return this.props.menuItems.filter(item => item.show_when === mode);
  };

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="teal">
          <div className="">
            <div className="nav-wrapper">
              <img className="kiwi" src={logo} alt="Logo" />

              <span data-target="mobile-nav" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </span>
              <a href="#" class="brand-logo">
                Kiwi Planner
              </a>

              <ul
                className="menuTop"
                id="nav-mobile"
                className="right hide-on-med-and-down"
              >
                {this.currentMenuItems().map(this.showMenuItem)}
              </ul>
            </div>
          </div>
        </nav>
        <Login
          setIsLoggedIn={this.props.setIsLoggedIn}
          id="modal-login"
          auth={this.props.auth}
        />
        <SignUp
          setIsLoggedIn={this.props.setIsLoggedIn}
          id="modal-signup"
          auth={this.props.auth}
        />

        <Logout
          setIsLoggedIn={this.props.setIsLoggedIn}
          id="modal-logout"
          auth={this.props.auth}
        />
        <Create
          setIsLoggedIn={this.props.setIsLoggedIn}
          id="modal-create"
          refresh={this.props.refresh}
          db={this.props.db}
        />
        <ul className="sidenav" id="mobile-nav">
          {this.currentMenuItems().map(this.showSideMenuItem)}
        </ul>
      </div>
    );
  }
}

export default NavBar;
