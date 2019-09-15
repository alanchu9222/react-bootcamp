import React from "react";
import "./NoteForm.css";
class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteContent: ""
    };
  }

  handleUserInput = event => {
    this.setState({ noteContent: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.addNote(this.state.noteContent);
    this.setState({ noteContent: "" });
  };

  render() {
    return (
      <div className="formWrapper">
        <input
          onChange={this.handleUserInput}
          className="noteInput"
          placeHolder="Write a new note..."
          value={this.state.noteContent}
        ></input>
        <button onClick={this.handleSubmit} className="noteButton">
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
