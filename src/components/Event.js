import React, { Component, Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Material-UI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
};

class Event extends Component {
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
    } = this.props;

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
              <Typography variant="h6">{listOfAttendees}</Typography>
              <Typography variant="h6">{listOfAbsentees}</Typography>
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
