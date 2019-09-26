import React from "react";
import axios from "axios";

// const places = ["Melbourne", "Adelaide", "Darwin", "Hobart", "Sydney"];
// const country = "Australia";

class GetLocation extends React.Component {
  state = { data: [], coordinates: [], dataReady: false };

  getCoordinates = (places, country, coordinates) => {
    axios
      .get(
        `https://us1.locationiq.com/v1/search.php?key=60b9313fae35ff&q=${
          places[0]
        }%20${country}&format=json`
      )
      .then(res => {
        const data = res.data;
        //console.log(data[0].lat);
        //console.log(data[0].lon);
        coordinates.push({ lat: data[0].lat, lon: data[0].lon });
        console.log(coordinates);
        if (places.length === 1) {
          this.setState({ coordinates: coordinates });
          this.setState({ dataReady: true });
          return;
        }
        places.shift();
        this.getCoordinates(places, country, coordinates);
      });
  };

  componentDidMount() {
    let locations = ["Melbourne", "invalid", "invalid", "Hobart", "Sydney"];
    const country = "Australia";
    let coordinates = [];
    this.getCoordinates(locations, country, coordinates);

    // axios
    //   .get(
    //     `https://us1.locationiq.com/v1/search.php?key=60b9313fae35ff&q=${
    //       places[0]
    //     }%20${country}&format=json`
    //   )
    //   .then(res => {
    //     const data = res.data;
    //     this.setState({ data });
    //     console.log(data[0].lat);
    //     console.log(data[0].lon);
    //     c = this.state.coordinates;
    //     c.push({ lat: data[0].lat , lon: data[0].lon})
    //     this.setState({coordinates: c})
    //   });
  }
  componentDidUpdate() {
    if (this.state.dataReady) {
      console.log("1:" + this.state.coordinates[0].lat);
      console.log("2:" + this.state.coordinates[1].lat);
      console.log("3:" + this.state.coordinates[2].lat);
      console.log("4:" + this.state.coordinates[3].lat);
      console.log("5:" + this.state.coordinates[4].lat);
    }
  }

  render() {
    return <div>HELLO</div>;
  }
}
export default GetLocation;
