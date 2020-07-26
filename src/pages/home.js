import React, { Component } from "react";
import axios from "axios";

// Components
import Event from "../components/Event";
import Profile from "../components/Profile";

// Material-UI
import Grid from "@material-ui/core/Grid";

class Home extends Component {
  state = {
    events: null,
  };

  componentDidMount() {
    axios
      .get("/event/user")
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
        </Grid>
        <Grid item sm={8} xs={12}>
          {eventsMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default Home;
