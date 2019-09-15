import React from "react";
import axios from "axios";

class ShowMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zenquote: ""
    };
  }
  componentDidMount() {
    const script = document.createElement("script");
    script.src = process.env.PUBLIC_URL + "../sdk/tomtom.min.js";
    document.body.appendChild(script);
    script.async = true;
    script.onload = function() {
      window.tomtom.L.map("map", {
        source: "vector",
        key: "nWLvkbwKuylT208jAh7FEOR9JFAxzg0I",
        center: [37.769167, -122.478468],
        basePath: "../sdk",
        zoom: 15
      });
    };
  }
  render() {
    return <div id="map" />;
  }
}
export default ShowMap;
