import React, { Component } from "react";
import M from "materialize-css";

class NavBar extends Component {
  static defaultProps = {
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
        target: "",
        description: "Logout",
        show_when: "logged-in"
      },
      {
        list_id: "2",
        menu_id: "",
        target: "modal-create",
        description: "Create Plan",
        show_when: "admin"
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
              {this.props.menuItems.map(menuItem => (
                <li key={menuItem.list_id} className="{menuItem.show_when}">
                  <span
                    className="z-depth-0 teal lighten-4 grey-text waves-effect waves-light btn modal-trigger"
                    data-target={menuItem.target}
                    id={menuItem.menu_id}
                  >
                    {menuItem.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {this.props.menuItems.map(menuItem => (
          <div key={menuItem.list_id} id={menuItem.target} className="modal">
            <div className="modal-content">
              <h4>{menuItem.description}</h4>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default NavBar;
