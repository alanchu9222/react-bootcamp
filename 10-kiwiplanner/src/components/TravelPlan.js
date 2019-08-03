import React, { Component } from "react";
import M from "materialize-css";

class TravelPlan extends Component {
  constructor(props) {
    super(props);
    this.collapsible = React.createRef();
  }

  state = {
    list: []
  };

  componentDidUpdate() {
    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
    //    M.Collapsible.init(this.collapsible);
  }

  componentDidMount() {
    // listen for auth status changes
    this.props.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.db
          .collection("guides")
          .get()
          .then(
            snapshot => {
              this.setupGuides(snapshot.docs);
            },
            err => console.log(err.message)
          );
      } else {
        this.setupGuides([]);
      }
    });
  }

  // setup guides
  setupGuides = data => {
    if (data.length) {
      data.forEach(doc => {
        const file = doc.data();
        const listItem = { title: file.title, content: file.content };

        this.setState({
          list: this.state.list.concat(listItem)
        });
      });
    }
  };

  listTravelPlan = listItem => {
    return (
      <li key={listItem.title} ref="collapsible">
        <div className="collapsible-header grey lighten-4">
          {listItem.title}
        </div>
        <div className="collapsible-body white"> {listItem.content} </div>
      </li>
    );
  };

  render() {
    return (
      <div className="container">
        <ul className="collapsible z-depth-0 ref={this.collapsible}">
          {this.state.list.map(this.listTravelPlan)}
        </ul>
      </div>
    );
  }
}

export default TravelPlan;
