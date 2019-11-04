import { connect } from "react-redux";
import {
  setPlacesMenu,
  setCardsVisible,
  setPlaceSelected,
  loadDataLocal,
  loadDataExternal,
  setIsLoggedIn
} from "../actions";

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

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const sideNav = document.querySelector(".sidenav");
      const sideMenu = M.Sidenav.init(sideNav, {});
      this.setState = { sideMenu: M.Modal.getInstance(sideMenu) };
    });
  }
  handleSideMenuClick = event => {
    const sidenavInstance = document.getElementById("mobile-nav").M_Sidenav;
    if (sidenavInstance) {
      sidenavInstance.close();
    }
  };

  handlePlaceClick = event => {
    const trip = this.props.cards.tripData.find(
      trip => trip.id === this.props.cards.trip_id_selected
    );
    this.props.setPlaceSelected(
      event.currentTarget.dataset.place,
      trip.country
    );
    this.props.loadDataLocal(
      event.currentTarget.dataset.place,
      this.props.places.country_selected
    );
    const searchKey =
      event.currentTarget.dataset.place +
      "-" +
      this.props.places.country_selected;

    if (!this.props.places.placesInLocalStore.includes(searchKey)) {
      this.props.loadDataExternal(
        event.currentTarget.dataset.place,
        this.props.places.country_selected
      );
    }

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
    const mode = this.props.firebase.isLoggedIn ? "logged-in" : "logged-out";
    let menuItems = this.props.menuItems.filter(
      item => item.show_when === mode
    );

    if (!this.props.cards.cardsVisible) {
      menuItems = menuItems.filter(item => item.remove_when_nocards === false);
    }
    //    cardsVisible
    return menuItems;
  };
  // handle logout
  handleLogout = () => {
    this.props.firebase.auth.signOut();
    this.props.setPlacesMenu([]);
    console.log("Logout clears places from the menuoptions");
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
                {this.props.firebase.isLoggedIn && (
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

                {this.props.firebase.isLoggedIn &&
                  !this.props.cards.cardsVisible &&
                  this.props.menu.places.map(this.showMenuPlace)}
                {this.currentMenuItems().map(this.showMenuItem)}
                {this.props.firebase.isLoggedIn && (
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
          setUser={this.props.setUser}
          id="modal-login"
          user={this.props.user}
        />
        <SignUp id="modal-signup" />
        <Create
          ref={this.createModal}
          setFlashMessage={this.props.setFlashMessage}
          id="modal-create"
          minStartDate={this.props.minStartDate}
          excludeDates={this.props.excludeDates}
          tripDates={this.props.tripDates}
        />
        {/* // ---------------------------------------------------------------------
        // Sidenav */}
        <ul className="sidenav" id="mobile-nav">
          {this.props.imageUrl && this.showImage(this.props.imageUrl)}
          {this.props.firebase.isLoggedIn && (
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


          {this.props.firebase.isLoggedIn &&
            !this.props.cards.cardsVisible &&
            this.props.menu.places.map(this.showMenuPlaceSide)}
          {this.currentMenuItems().map(this.showSideMenuItem)}
          {this.props.firebase.isLoggedIn && (
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
  return {
    cards: state.cards,
    menu: state.menu,
    places: state.places,
    firebase: state.firebase
  };
};
export default connect(
  mapStateToProps,
  {
    setPlacesMenu,
    setCardsVisible,
    setPlaceSelected,
    loadDataLocal,
    loadDataExternal,
    setIsLoggedIn
  }
)(NavBar);
