import React, { Component } from "react";
import Auth from "./Auth";
import M from "materialize-css";
class NavBar extends Component {
  static defaultProps = {
    auth: null,
    menuItems: [
      {
        list_id: "0",
        menu_id: "",
        target: "modal-view",
        description: "View Mode",
        show_when: "logged-in"
      },
      {
        list_id: "1",
        menu_id: "logout",
        target: "modal-logout",
        description: "Logout",
        show_when: "logged-in"
      },
      {
        list_id: "2",
        menu_id: "",
        target: "modal-create",
        description: "Create Plan",
        show_when: "logged-in"
      },
      {
        list_id: "3",
        menu_id: "",
        target: "modal-login",
        description: "Login",
        show_when: "logged-out"
      },
      {
        list_id: "4",
        menu_id: "",
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
      const sideNav = document.querySelector(".sidenav");
      M.Sidenav.init(sideNav, {});
    });
    console.log(this.props.menuItems);
    console.log(this.props.menuItems[0].id);
  }
  renderMenuItem = menuItem => {
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
  renderSideMenuItem = menuItem => {
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
              {this.currentMenuItems().map(this.renderMenuItem)}
            </ul>
          </div>
        </nav>

        {this.props.menuItems.map(menuItem => (
          <div key={menuItem.list_id} id={menuItem.target} className="modal">
            {/* The auth component is mapped to a user event on the menus */}
            {/* The "target" is used to determine what to render on the modal */}
            <div className="modal-content">
              <h4>{menuItem.description}</h4>
              <Auth target={menuItem.target} auth={this.props.auth} />
            </div>
          </div>
        ))}

        <ul className="sidenav" id="mobile-nav">
          {this.currentMenuItems().map(this.renderSideMenuItem)}
        </ul>
      </div>
    );
  }
}

export default NavBar;
