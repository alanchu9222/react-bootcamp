import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as contentful from "contentful";
import Plan from "./Plan";

const SPACE_ID = "cqmf68y216os";
const ACCESS_TOKEN = "8u9w6xbF3YuFjUMxfDq2dxYCTNfBSsNLNgjE3amGB6U";

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

class TravelList extends Component {
  state = {
    plans: [],
    searchString: ""
  };

  constructor() {
    super();
    this.getPlans();
  }

  getPlans = () => {
    client
      .getEntries({
        content_type: "plan",
        query: this.state.searchString
      })
      .then(response => {
        this.setState({ plans: response.items });
        console.log("Query made to back end");
        console.log(this.state.searchString);
      })
      .catch(error => {
        console.log("Error occured while fetching data");
        console.log(error);
      });
  };

  onSearchInputChange = event => {
    if (event.target.value) {
      this.setState({ searchString: event.target.value });
    } else {
      this.setState({ searchString: "" });
    }
    this.getPlans();
  };

  render() {
    return (
      <div>
        <TextField
          style={{ padding: 24 }}
          id="searchInput"
          placeholder="Search for travel plans"
          margin="normal"
          onChange={this.onSearchInputChange}
        />

        <Grid container spacing={24} style={{ padding: 24 }}>
          {this.state.plans.map(currentPlan => (
            <Grid item xs={12} sm={2} m={2} lg={2} xl={2}>
              <Plan plan={currentPlan} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default TravelList;
