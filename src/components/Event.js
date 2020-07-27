import React, { Component, Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Material-UI
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import transitions from "@material-ui/core/styles/transitions";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  List,
  ListItem,
  Paper,
} from "@material-ui/core";

// Redux
import { connect } from "react-redux";
import { getOneEvent } from "../redux/actions/eventActions";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  content: {
    padding: 25,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
};

class Event extends Component {

  state = {
    collapse1: false,
    collapse2: false,
  }

  componentDidMount() {
    this.props.getOneEvent(this.props.eventId);
  }

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      event: {
        event: {
          name,
          organiser,
          cca,
          duration,
          dateTime,
          createdAt,
          listOfAttendees,
          listOfAbsentees,
        },
      },
      status,
      loading,
    } = this.props;
    const { collapse1, collapse2 } = this.state;

    const handleClick1 = () => {
      this.setState({ collapse1: !collapse1 });
    };

    const handleClick2 = () => {
      this.setState({ collapse2: !collapse2 });
    };

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h6">{dateTime}</Typography>
          <Typography variant="h6">Organiser: {organiser}</Typography>
          <Typography variant="h6">CCA: {cca}</Typography>
          <Typography variant="h6">Duration: {duration} hour(s)</Typography>
          {status === "Admin " && (
            <Fragment>
              <CardActions>
                <Typography variant="button">Attendees</Typography>
                <IconButton
                  className={!collapse1 ? classes.expand : classes.expandOpen}
                  onClick={handleClick1}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={collapse1} timeout="auto" unmountOnExit>
                <Paper>
                  {loading ? (
                    <Typography variant="body2">Loading...</Typography>
                  ) : listOfAttendees ? (
                    <List>
                      {listOfAttendees.map((studentCard) => (
                        <ListItem key={studentCard}>
                          {studentCard}
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2">No Attendees</Typography>
                  )}
                </Paper>
              </Collapse>
              <CardActions>
                <Typography variant="button">Absentees</Typography>
                <IconButton
                  className={!collapse2 ? classes.expand : classes.expandOpen}
                  onClick={handleClick2}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={collapse2} timeout="auto" unmountOnExit>
                <Paper>
                  {loading ? (
                    <Typography variant="body2">Loading...</Typography>
                  ) : listOfAbsentees ? (
                    <List>
                      {listOfAbsentees.map((studentCard) => (
                        <ListItem key={studentCard}>
                          {studentCard}
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2">No Absentees</Typography>
                  )}
                </Paper>
              </Collapse>
            </Fragment>
          )}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.user.adminStatus.tokenHeader,
  event: state.event,
});

const mapActionsToProps = {
  getOneEvent,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Event));
