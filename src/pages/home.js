import React, { Component } from "react";
import axios from "axios";

// Components
import Event from "../components/Event";
import Profile from "../components/Profile";

// Material-UI
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { getEvents } from "../redux/actions/eventActions";
import { Typography } from "@material-ui/core";

class home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    const {
      event: { events, loading },
    } = this.props;

    return (
      <Grid container spacing={3} direction="row">
        <Grid item sm={3} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          {loading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : events.length !== 0 ? (
            events.map((event) => <Event key={event.eventId} event={event} />)
          ) : (
            <Typography variant="body2">No Events</Typography>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  event: state.event,
});

const mapActionsToProps = {
  getEvents,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
