import React, { Component } from "react";
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
          <h4>Create Guide</h4>
          <form id="create-form" onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                id="title"
                onChange={this.handleChangeTitle}
                required
              />
              <label htmlFor="title">Journey</label>
            </div>
            <div className="input-field">
              <textarea
                id="content"
                className="materialize-textarea"
                onChange={this.handleChangeContent}
                required
              />
              <label htmlFor="content">Details</label>
            </div>
            <button className="btn yellow darken-2 z-depth-0">Create</button>
          </form>
        </div>
      </div>
    );
  }
}

export default U_create;
