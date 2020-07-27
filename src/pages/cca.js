import React, { Component, Fragment } from "react";

// Components
import Event from "../components/Event";
import Profile from "../components/Profile";
import Request from "../components/Request";

// Material-UI
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardActionArea,
  Typography,
  Collapse,
  Paper,
  List,
  ListItem,
} from "@material-ui/core";

// Redux
import { connect } from "react-redux";
import { getPendingRequest, getCCADetails } from "../redux/actions/ccaActions";
import { getOrganisedEvents } from "../redux/actions/eventActions";

class cca extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  componentDidMount() {
    this.props.getOrganisedEvents();
    this.props.getPendingRequest();
    this.props.getCCADetails();
  }

  render() {
    const {
      cca: { listOfMembers, loading: ccaLoading },
      event: { events, loading: eventLoading },
    } = this.props;
    const { collapse } = this.state;
    const handleClick = () => {
      this.setState({ collapse: !collapse });
    };

    return (
      <Fragment>
        <Grid container spacing={3} direction="row">
          <Grid item sm={3} xs={12}>
            <Profile />
            <Request />
            <Fragment>
              <Card button onClick={handleClick}>
                <CardActionArea>
                  <Typography variant="h6">Members</Typography>
                </CardActionArea>
              </Card>
              <Collapse in={collapse} timeout="auto" unmountOnExit>
                <Paper>
                  {ccaLoading ? (
                    <Typography variant="body2">Loading...</Typography>
                  ) : listOfMembers ? (
                    <List>
                      {listOfMembers.map((studentCard) => (
                        <ListItem key={studentCard}>
                          <Typography variant="body2">{studentCard}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2">No Members</Typography>
                  )}
                </Paper>
              </Collapse>
            </Fragment>
          </Grid>
          <Grid item sm={8} xs={12}>
            {eventLoading ? (
              <Typography variant="body2">Loading...</Typography>
            ) : events.length !== 0 ? (
              events.map((event) => <Event key={event.eventId} event={event} />)
            ) : (
              <Typography variant="body2">No Events</Typography>
            )}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cca: state.cca,
  event: state.event,
});

const mapActionsToProps = {
  getPendingRequest,
  getCCADetails,
  getOrganisedEvents,
};

export default connect(mapStateToProps, mapActionsToProps)(cca);
