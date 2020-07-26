import React, { Component } from "react";
import axios from "axios";

// Components
import Event from "../components/Event";
import Profile from "../components/Profile";
import Request from "../components/Request";

// Material-UI
import Grid from "@material-ui/core/Grid";

class cca extends Component {
  constructor() {
    super();
    this.state = {
      events: null,
    };
  }

  componentDidMount() {
    axios
      .get("/event/cca")
      .then((res) => {
        this.setState({
          events: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let eventsMarkup = this.state.events ? (
      this.state.events.map((event) => (
        <Event key={event.eventId} event={event} />
      ))
    ) : (
      <p>Loading... </p>
    );

    return (
      <Grid container spacing={3} direction="row">
        <Grid item sm={3} xs={12}>
          <Profile />
          <Request history={this.props.history} />
        </Grid>
        <Grid item sm={8} xs={12}>
          {eventsMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default cca;
