import { connect } from "react-redux";
import {
  refreshCards,
  setPlacesMenu,
  deleteTrip,
  deleteDone
} from "../actions";

import React, { Component } from "react";
import "./U_delete.css";
import M from "materialize-css";

class U_delete extends Component {
  constructor(props) {
    super(props);
    this.state = { modalDelete: "", message: "" };
  }
  // The parent will trigger a delete process from this method
  setPlaceDelete = trip => {
    this.setState({
      tripIdToDelete: trip.id,
      message:
        "Please confirm deletion of trip to " + trip.city + " " + trip.country
    });
    this.props.deleteDone();
    this.state.modalDelete.open();
  };
  deleteCancelled = () => {
    this.setState({ tripIdToDelete: "" });
    this.state.modalDelete.close();
  };

  deleteConfirmed = () => {
    this.props.firebase.db
      .collection("trips")
      .doc(this.state.tripIdToDelete)
      .delete()
      .then(result => {
        // 1. Refresh the UI - cardsUpdated: TravelCards()
        this.props.refreshCards(
          this.props.firebase.db,
          ""
        );
        this.props.setPlacesMenu([]);
        //this.props.deleteCompleted(true);
      })
      .catch(err => {
        //this.props.deleteCompleted(false);
      });
    this.state.modalDelete.close();
  };

  componentDidMount() {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
    const modalDelete = document.querySelector("#modal_delete");
    const instance = M.Modal.getInstance(modalDelete);
    this.setState({ modalDelete: instance });
  }
  componentDidUpdate() {
    if (this.props.cards.tripToDelete !== undefined) {
      this.setPlaceDelete(this.props.cards.tripToDelete);
    }
  }
  render() {
    return (
      <div>
        <div id="modal_delete" className="modal">
          <div className="modal-content">
            <p>{this.state.message}</p>
          </div>
          <div className="modal-footer">
            <button
              onClick={this.deleteCancelled}
              className="button-delete button btn yellow darken-2 z-depth-1 waves-effect waves-light"
            >
              Cancel
            </button>
            <button
              onClick={this.deleteConfirmed}
              className="button-delete button btn yellow darken-2 z-depth-1 waves-effect waves-light"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }
}

//export default U_delete;
const mapStateToProps = state => {
  return { cards: state.cards, firebase: state.firebase };
};
export default connect(
  mapStateToProps,
  { refreshCards, setPlacesMenu, deleteTrip, deleteDone }
)(U_delete);
