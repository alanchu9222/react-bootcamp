import React, { Component } from "react";
import PickCity from "./U_pickcity";
import "./U_create.css";
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
          <form
            autoComplete="off"
            id="create-form"
            onSubmit={this.handleSubmit}
          >
            <PickDate />
            <PickCity />
            <div className="flex-container">
              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handleChangeContent}
                  required
                />

                <label htmlFor="content">Place of Interest 1</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handleChangeContent}
                  required
                />
                <label htmlFor="content">Place of Interest 2</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handleChangeContent}
                  required
                />
                <label htmlFor="content">Place of Interest 3</label>
              </div>
              <div className="spacer" />

              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  onChange={this.handleChangeContent}
                  required
                />
                <label htmlFor="content">Place of Interest 4</label>
              </div>
            </div>

            <button className="button btn yellow darken-2 z-depth-0">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default U_create;
