// components to install
// npm install react-datepicker --save

import "./TravelPlan.css";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TravelPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }
  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (
      <div>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />

        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          minDate={this.state.startDate}
        />
      </div>
    );
  }
}
export default TravelPlan;
