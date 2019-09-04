// components to install
// npm install react-datepicker --save

import React, { Component } from "react";
import "./U_pickdate.css";
// Refer to https://reactdatepicker.com/#example-default
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class PickDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
  }
  setInitialDates = (start, end) => {
    this.setState({
      startDate: start,
      endDate: end
    });
  };

  componentDidMount() {
    // Inform the parent of the initial dates
    this.props.setDates(this.state.startDate, this.state.endDate);
  }
  handleChangeStart = startDate => {
    this.setState({
      startDate: startDate
    });
    this.props.setDates(startDate, this.state.endDate);
  };
  handleChangeEnd = endDate => {
    this.setState({
      endDate: endDate
    });
    this.props.setDates(this.state.startDate, endDate);
  };

  render() {
    return (
      <div id="dates">
        Start Date &nbsp; &nbsp; &nbsp;
        <DatePicker
          popperPlacement="bottom"
          popperModifiers={{
            flip: {
              behavior: ["bottom"] // don't allow it to flip to be above
            },
            preventOverflow: {
              enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
            },
            hide: {
              enabled: false // turn off since needs preventOverflow to be enabled
            }
          }}
          minDate={this.props.minStartDate}
          excludeDates={this.props.excludeDates}
          dateFormat="dd/MM/yyyy"
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />
        End Date &nbsp; &nbsp; &nbsp;
        <DatePicker
          popperPlacement="bottom"
          popperModifiers={{
            flip: {
              behavior: ["bottom"] // don't allow it to flip to be above
            },
            preventOverflow: {
              enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
            },
            hide: {
              enabled: false // turn off since needs preventOverflow to be enabled
            }
          }}
          dateFormat="dd/MM/yyyy"
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          // minimum date is from startdate onwards
          minDate={this.state.startDate}
          excludeDates={this.props.excludeDates}
        />
      </div>
    );
  }
}

export default PickDate;
