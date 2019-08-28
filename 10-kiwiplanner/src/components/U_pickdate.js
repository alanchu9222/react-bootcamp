// components to install
// npm install react-datepicker --save

import React, { Component } from "react";
import "./U_pickdate.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class PickDate extends Component {
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
    this.props.setDates(this.state.startDate, this.state.endDate);
  }
  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
    this.props.setDates(this.state.startDate, this.state.endDate);
  }

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
          minDate={this.state.startDate}
        />
      </div>
    );
  }
}

export default PickDate;
