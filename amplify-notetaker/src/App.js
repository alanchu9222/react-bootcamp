import React from "react";
import { Component } from "react";
import { withAuthenticator } from "aws-amplify-react";
class App extends Component {
  state = {
    notes: [
      {
        id: 1,
        note: "Hello World"
      }
    ]
  };
  render() {
    const { notes } = this.state;
    return (
      <div className="flex flex-column items-center justify-center bg-washed-red pa3 f1">
        <h1 className="code f2">Amplify Notetaker</h1>
        {/* Note Form */}
        <form className="mb3">
          <input className="pa2 f4" placeholder="Write your note" type="text" />

          <button type="submit" className="pa2 f4">
            Add Note
          </button>
        </form>

        {/* Note List */}
        <div>
          {notes.map((item, i) => (
            <div key={item.id} className="flex items-center">
              <li className="list pa1 f3">{item.note}</li>
              <button className="bg-transparent bn f4">
                <span>&times;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
