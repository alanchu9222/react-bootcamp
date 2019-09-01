import React, { Component } from "react";
import "./U_create.css";
import M from "materialize-css";

class U_delete extends Component {
  constructor(props) {
    super(props);
    this.state = { modalDelete: "", message: "" };
  }
  // The parent will trigger a delete process form this method
  setPlaceDelete = trip => {
    this.setState({
      tripIdToDelete: trip.id,
      message:
        "Please confirm deletion of trip to " + trip.city + " " + trip.country
    });
    this.state.modalDelete.open();
  };
  deleteCancelled = () => {
    this.setState({ tripIdToDelete: "" });
    this.state.modalDelete.close();
  };

  deleteConfirmed = () => {
    this.props.db
      .collection("trips")
      .doc(this.state.tripIdToDelete)
      .delete()
      .then(result => {
        this.props.deleteCompleted(true);
      })
      .catch(err => {
        this.props.deleteCompleted(false);
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

  render() {
    return (
      <div>
        <div id="modal_delete" className="modal">
          <div className="modal-content">
            <p>{this.state.message}</p>
          </div>
          <div class="modal-footer">
            <a
              href="#!"
              onClick={this.deleteCancelled}
              class="modal-close waves-effect waves-green btn-flat"
            >
              Cancel
            </a>
            <a
              href="#!"
              onClick={this.deleteConfirmed}
              class="modal-close waves-effect waves-green btn-flat"
            >
              Ok
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default U_delete;
