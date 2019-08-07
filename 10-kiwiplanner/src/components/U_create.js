import React, { Component } from "react";
import PickCity from "./U_pickcity";
import PickCountry from "./U_pickcountry";
import PickDate from "./U_pickdate";

import M from "materialize-css";

class U_create extends Component {
  static defaultProps = {
    target: ""
  };
  constructor(props) {
    super(props);
    this.state = { title: "", content: "" };
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, {});
    });
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  handleChangeContnet = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const title = this.state.title;
    const content = this.state.content;

    // create new guide

    this.props.db
      .collection("guides")
      .add({
        title: title,
        content: content
      })
      .then(() => {
        // close the create modal & reset form
        const modal = document.querySelector("#modal-create");
        M.Modal.getInstance(modal).close();
        this.props.refresh();
        //this.createForm.reset();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div id="modal-create" className="modal">
        <div className="modal-content">
          <h4>Add a trip</h4>
          <form id="create-form" onSubmit={this.handleSubmit}>
            {/*/<PickCountry />*/}
            <PickCity />
            <PickDate />

            <div className="input-field">
              <input
                type="text"
                id="country"
                onChange={this.handleChangeTitle}
                required
              />
              <label htmlFor="country">Country</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                id="city"
                onChange={this.handleChangeTitle}
                required
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="input-field">
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChangeContent}
                required
              />
              <label htmlFor="content">Arrival Date</label>
            </div>
            <div className="input-field">
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChangeContent}
                required
              />
              <label htmlFor="content">Departure Date</label>
            </div>
            <div className="input-field">
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChangeContent}
                required
              />
              <label htmlFor="content">Place of Interest 1</label>
            </div>
            <div className="input-field">
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChangeContent}
                required
              />
              <label htmlFor="content">Place of Interest 2</label>
            </div>
            <div className="input-field">
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChangeContent}
                required
              />
              <label htmlFor="content">Place of Interest 3</label>
            </div>

            <button className="btn yellow darken-2 z-depth-0">Create</button>
          </form>
        </div>
      </div>
    );
  }
}

export default U_create;
