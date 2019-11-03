import React, { Component } from "react";
class Instructions extends Component {
  render() {
    return (
      <div className="demo-message">
        <h4>
          This is demo software : You may login as test@yahoo.com (Password =
          abc123)
        </h4>
        <div className="instructions-header">
          <h5>User Instructions (hover below)</h5>
        </div>

        <div className="instructions">
          <ul>View preloaded trip information</ul>
          <li>Each destination has a card on the screen</li>
          <li>Select the card to view destination details</li>
          <li>There is an edit icon on each card for updating trip details</li>
          <li>There is a delete icon on each card for deleting a trip</li>
          <li>
            Each card provides information on : weather, and local information
            for a set of local places of interest
          </li>

          <ul>Navbar options</ul>
          <li>Main: show trip cards</li>
          <li>Place of interest (name of place): show local information</li>
          <li>
            Add destination: add a new travel destination and create a new trip
            card
          </li>

          <ul>Add a destination</ul>
          <li>The user may add a destination to the card deck</li>
          <li>
            For a new trip, the user is required to specify the travel date and
            the destination country and airport
          </li>
          <li>
            The user can choose to specify places of interest when adding the
            trip or by using the edit icon when a new trip card is created
          </li>
          <p></p>
        </div>
      </div>
    );
  }
}
export default Instructions;
