import { connect } from "react-redux";
import { setCardsVisible, setPlaceSelected, loadDataLocal } from "../actions";

import React, { Component } from "react";
import Login from "./U_login";
import Create from "./U_create";
import SignUp from "./U_signup";
import logo from "../img/image.png";
import "./NavBar.css";

import M from "materialize-css";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.createModal = React.createRef();
    this.state = {
      isLoggedIn: false,
      menuOptions: [],
      sideMenu: ""
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
        remove_when_nocards: true
      },
      {
        list_id: "login",
        menu_id: "",
        target: "modal-login",
        description: "Login",
        remove_when_nocards: false,
        show_when: "logged-out"
      },
      {
        list_id: "signup",
        menu_id: "",
        target: "modal-signup",
        description: "Sign Up",
        remove_when_nocards: false,
        show_when: "logged-out"
      }
    ]
  };
  initDatePicker = minStartDate => {
    //    this.createModal.current.initDatePicker(minStartDate);
  };
  componentDidUpdate(prevProps) {
    if(prevProps.menu.places !== this.props.menu.places){
      //alert("CHANGE MENU!!! "+this.props.menu.places);
      this.setState({ menuOptions: this.props.menu.places });      
    }


    // if (!this.props.menuOptions) {
    //   return;
    // } else if (!this.state.menuOptions) {
    //   //this.setState({ menuOptions: this.props.menuOptions });
    //   //alert("Setting Up MenuOptions");
    // } else if (this.state.menuOptions[0] !== this.props.menuOptions[0]) {
    //   this.setState({ menuOptions: this.props.menuOptions });
    // } else if (
    //   this.state.menuOptions.length !== this.props.menuOptions.length
    // ) {
    //   // Above may escape detection if destinations have same point of interest #1
    //   this.setState({ menuOptions: this.props.menuOptions });
    // }
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const sideNav = document.querySelector(".sidenav");
      const sideMenu = M.Sidenav.init(sideNav, {});
      //      alert("this sidemenu has been initialized");
      this.setState = { sideMenu: M.Modal.getInstance(sideMenu) };
      // const sm = document.querySelector("#mobile-nav");
      // instance = M.Sidenav.getInstance(sm);
      // instance.close();
    });
  }
  handleSideMenuClick = event => {
    const sidenavInstance = document.getElementById("mobile-nav").M_Sidenav;
    if (sidenavInstance) {
      sidenavInstance.close();
    }
  };

  handlePlaceClick = event => {
//    this.props.setPlace(event.currentTarget.dataset.place);
    this.props.setPlaceSelected(event.currentTarget.dataset.place);
    this.props.loadDataLocal(event.currentTarget.dataset.place, this.props.places.country);

    this.handleSideMenuClick();
    this.props.setCardsVisible(false);
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
        <div
          className="nav-button z-depth-0 white-text waves-effect waves-light modal-trigger"
          data-place={place}
          onClick={this.handlePlaceClick}
        >
          {place}
        </div>
      </li>
    );
  };

  showImage = imageUrl => {
    return <img className="side-image" src={imageUrl} alt="city_image"></img>;
  };

  showMenuPlaceSide = place => {
    // Data-place store the parameter for the onCLick Call
    // The value is retrieved using event.currentTarget.dataset.place
    return (
      <li key={place} className="logged-in">
        <div
          className="nav-button side-button z-depth-0 teal-text waves-effect waves-light modal-trigger"
          data-place={place}
          onClick={this.handlePlaceClick}
        >
          {place}
        </div>
      </li>
    );
  };

  showSideMenuItem = menuItem => {
    return (
      <li key={menuItem.list_id}>
        <div
          className="nav-button side-button z-depth-0 teal-text waves-effect waves-light modal-trigger"
          data-target={menuItem.target}
          onClick={this.handleSideMenuClick}
          href={menuItem.target}
          id={menuItem.menu_id}
        >
          {menuItem.description}
        </div>
      </li>
    );
  };
  currentMenuItems = () => {
    // Current menu item depends on the state of authentication
    const mode = this.props.isLoggedIn ? "logged-in" : "logged-out";
    let menuItems = this.props.menuItems.filter(
      item => item.show_when === mode
    );
    if (!this.props.cardsVisible) {
      menuItems = menuItems.filter(item => item.remove_when_nocards === false);
    }
    //    cardsVisible
    return menuItems;
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
              <span data-target="mobile-nav" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </span>
              <div className="brand-logo disable-select">
                <img className="kiwi" src={logo} alt="Logo" />
                <span className="logo-text">Local Travel Guide</span>
              </div>
              <ul
                id="nav-mobile"
                className="menuTop right hide-on-med-and-down"
              >
                {this.props.isLoggedIn && (
                  <li>
                    <div
                      onClick={() => {
                        this.props.setCardsVisible(true);
                      }}
                      className="nav-button z-depth-0 white-text waves-effect waves-light"
                      id="nav-logout"
                    >
                      Main
                    </div>
                  </li>
                )}

                {this.props.isLoggedIn &&
                  this.state.menuOptions.map(this.showMenuPlace)}
                {this.currentMenuItems().map(this.showMenuItem)}
                {this.props.isLoggedIn && (
                  <li>
                    <div
                      onClick={this.handleLogout}
                      className="nav-button z-depth-0 white-text waves-effect waves-light"
                      id="nav-logout"
                    >
                      Logout
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {/* // ---------------------------------------------------------------------
        // Modals */}
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
          ref={this.createModal}
          setFlashMessage={this.props.setFlashMessage}
          setIsLoggedIn={this.props.setIsLoggedIn}
          id="modal-create"
          minStartDate={this.props.minStartDate}
          excludeDates={this.props.excludeDates}
          tripDates={this.props.tripDates}
          refresh={this.props.refresh}
          db={this.props.db}
        />
        {/* // ---------------------------------------------------------------------
        // Sidenav */}
        <ul className="sidenav" id="mobile-nav">
          {this.props.imageUrl && this.showImage(this.props.imageUrl)}
          {this.props.isLoggedIn && (
            <li>
              <div
                onClick={() => {
                  this.props.setCardsVisible(true);
                  const elem = document.getElementById("mobile-nav");
                  const sidenavInstance = M.Sidenav.getInstance(elem);
                  if (sidenavInstance) {
                    sidenavInstance.close();
                  }
                }}
                className="nav-button side-button z-depth-0 teal-text waves-effect waves-light"
                id="nav-logout"
              >
                Main
              </div>
            </li>
          )}

          {this.props.isLoggedIn &&
            this.state.menuOptions.map(this.showMenuPlaceSide)}
          {this.currentMenuItems().map(this.showSideMenuItem)}
          {this.props.isLoggedIn && (
            <li>
              <div
                className="z-depth-0 teal-text waves-effect waves-light nav-button side-button"
                onClick={this.handleLogout}
                id="side-logout"
              >
                Logout
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

//export default NavBar;
const mapStateToProps = state => {
  return { cards: state.cards, menu: state.menu, places: state.places };
};
export default connect(
  mapStateToProps,
  { setCardsVisible, setPlaceSelected, loadDataLocal }
)(NavBar);
