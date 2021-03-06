import { connect } from "react-redux";
import { setIsLoggedIn } from "../actions";
import history from "../history";
import React, { Component } from "react";
import M from "materialize-css";
import "./U_logout.css";

class U_logout extends Component {
  constructor(props) {
    super(props);
    this.logoutModal = React.createRef();
    this.logoutForm = React.createRef();
  }
  handleSubmit = e => {
    e.preventDefault();
    // log the user out
    this.props.firebase.auth.signOut();
    const modal = document.querySelector("#modal-logout");
    this.props.setIsLoggedIn(false);
    history.push("/");
    M.Modal.getInstance(modal).close();
  };

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, {});
    });
  }

  render() {
    return (
      <div id="modal-logout" className="modal">
        <div className="modal-content logout">
          <h4>Logging out</h4>
        </div>
      </div>
    );
  }
}

//export default U_logout;
const mapStateToProps = state => {
  return { firebase: state.firebase };
};
export default connect(
  mapStateToProps,
  { setIsLoggedIn }
)(U_logout);
