import React, { Component } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Material-UI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      event: { name, organiser, cca, duration, dateTime, createdAt },
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h6">{dateTime}</Typography>
          <Typography variant="h6">{organiser}</Typography>
          <Typography variant="h6">{cca}</Typography>
          <Typography variant="h6">{duration}</Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Event);
