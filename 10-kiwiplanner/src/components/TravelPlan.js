import React, { Component } from "react";
class TravelPlan extends Component {
  // setup guides
  setupGuides = data => {
    if (data.length) {
      let html = "";
      data.forEach(doc => {
        const guide = doc.data();
        const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;
        html += li;
      });
      guideList.innerHTML = html;
    } else {
      guideList.innerHTML =
        '<h5 class="center-align">Login to view guides</h5>';
    }
  };
  render() {
    return <div>TravelPlan</div>;
  }
}

export default TravelPlan;

// DOM elements
const guideList = document.querySelector(".guides");
