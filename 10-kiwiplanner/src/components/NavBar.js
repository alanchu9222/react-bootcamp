import React, { Component } from "react";
import Login from "./U_login";
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
      isLoggedIn: false,
      menuOptions: []
    };
  }
  static defaultProps = {
    auth: null,
    menuItems: [
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
  componentDidUpdate() {
    if (!this.props.menuOptions) {
      return;
    } else if (!this.state.menuOptions) {
      //this.setState({ menuOptions: this.props.menuOptions });
      //alert("Setting Up MenuOptions");
    } else if (this.state.menuOptions[0] != this.props.menuOptions[0]) {
      this.setState({ menuOptions: this.props.menuOptions });
    }
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      //      const elems = document.querySelectorAll(".modal");
      //      M.Modal.init(elems, {});
      const sideNav = document.querySelector(".sidenav");
      M.Sidenav.init(sideNav, {});
    });
  }
  handleClick = event => {
    this.props.setPlace(event.currentTarget.dataset.place);
  };
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
  showMenuPlace = place => {
    // Data-place store the parameter for the onCLick Call
    // The value is retrieved using event.currentTarget.dataset.place
    return (
      <li key={place} className="logged-in">
        <a
          className="z-depth-0 white-text waves-effect waves-light modal-trigger"
          data-place={place}
          onClick={this.handleClick}
        >
          {place}
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

  resetCreateModal = () => {
    alert("Im gonna reset the create form NOW!");
  };

  currentMenuItems = () => {
    // Current menu item depends on the state of authentication
    const mode = this.props.isLoggedIn ? "logged-in" : "logged-out";
    return this.props.menuItems.filter(item => item.show_when === mode);
  };
  // handle logout
  handleLogout = () => {
    this.props.auth.signOut();
    this.setState({ menuOptions: [] });
    this.props.setIsLoggedIn(false);
    this.props.setUser("");
  };
  render() {
    return (
      // ---------------------------------------------------------------------
      // Navbar
      <div className="navbar-fixed">
        <nav className="teal">
          <div className="">
            <div className="nav-wrapper">
              <img className="kiwi" src={logo} alt="Logo" />
              <span data-target="mobile-nav" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </span>
              <a href="#" className="brand-logo">
                Kiwi Planner
              </a>

              <ul
                className="menuTop"
                id="nav-mobile"
                className="right hide-on-med-and-down"
              >
                {this.props.isLoggedIn &&
                  this.state.menuOptions.map(this.showMenuPlace)}
                {this.currentMenuItems().map(this.showMenuItem)}
                {this.props.isLoggedIn && (
                  <li>
                    <a
                      href="#"
                      onClick={this.handleLogout}
                      className="z-depth-0 white-text waves-effect waves-light"
                      id="nav-logout"
                    >
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        // ---------------------------------------------------------------------
        // Modals
        <Login
          setIsLoggedIn={this.props.setIsLoggedIn}
          setUser={this.props.setUser}
          id="modal-login"
          auth={this.props.auth}
          user={this.props.user}
        />
        <SignUp
          setIsLoggedIn={this.props.setIsLoggedIn}
          id="modal-signup"
          auth={this.props.auth}
        />
        <Create
          setFlashMessage={this.props.setFlashMessage}
          setIsLoggedIn={this.props.setIsLoggedIn}
          id="modal-create"
          refresh={this.props.refresh}
          db={this.props.db}
        />
        // ---------------------------------------------------------------------
        // Sidenav
        <ul className="sidenav" id="mobile-nav">
          {this.currentMenuItems().map(this.showSideMenuItem)}
          {this.props.isLoggedIn && (
            <li>
              <a
                className="z-depth-0 black-text waves-effect waves-light"
                href="#"
                onClick={this.handleLogout}
                id="side-logout"
              >
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default NavBar;
