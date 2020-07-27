import React, { Component, Fragment } from "react";

// Components
import Event from "../components/Event";
import Profile from "../components/Profile";
import Request from "../components/Request";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardActions,
  Typography,
  Collapse,
  Paper,
  List,
  ListItem,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import transitions from "@material-ui/core/styles/transitions";

// Redux
import { connect } from "react-redux";
import { getPendingRequest, getCCADetails } from "../redux/actions/ccaActions";
import { getOrganisedEvents } from "../redux/actions/eventActions";

const styles = {
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: transitions.create("transform", {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  member: {
    textAlign: "center",
    margin: "auto",
  },
};

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
      classes,
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
                <CardActions>
                  <Typography variant="button">
                    Members
                  </Typography>
                  <IconButton
                    className={!collapse ? classes.expand : classes.expandOpen}
                    onClick={handleClick}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(cca));
