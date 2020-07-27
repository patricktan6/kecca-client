import React, { Component, Fragment } from 'react';
import Icon from "../images/logo.png";
import axios from 'axios';
import Attendance from './attendance';

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";

const styles = {
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "5px auto 10px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
  };

class event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: "",
            eventId: "",
            duration: "",
            date: "",
            submitted: false,
            members:[],
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = (event) => {
      event.preventDefault();
      if (this.state.eventName !== "" && this.state.duration !== "" && this.state.date !== "") {
        axios
          .post("/event", { name: this.state.eventName, 
                            dateTime: this.state.date,
                            duration: this.state.duration})
          .then(res => {
            this.setState({ 
              eventId: res.data.eventId, 
              submitted: true
            });
          })
          .catch((err) => console.log(err));
      }
    }

    render() {
        const {
          classes,
          UI: { loading },
        } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                  {!this.state.submitted ? (
                    <Fragment>
                      <img src={Icon} alt="KEVII Logo" className={classes.image} />
                      <Typography variant="h3" className={classes.pageTitle}>
                        New Event
                      </Typography>
                      <form noValidate >
                        <TextField 
                        id="eventName"
                        name="eventName"
                        type="eventName"
                        label="New Event"
                        className={classes.textField}
                        value={this.state.eventName}
                        onChange={this.handleChange}
                        fullWidth
                        />
                        <TextField
                          id="datetime-local"
                          label="Date and Time"
                          type="datetime-local"
                          defaultValue="2017-05-24T10:30"
                          className={classes.textField}
                          value={this.state.date}
                          onChange={(e) => { this.setState({date : e.target.value}) } }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                        <TextField 
                          id="duration"
                          name="duration"
                          type="duration"
                          label="Duration (hours)"
                          className={classes.textField}
                          value={this.state.duration}
                          onChange={this.handleChange}
                          fullWidth
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          disabled={loading}
                          onClick={this.handleSubmit}
                        >
                        Create Event
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                        </Button>
                      </form>
                    </Fragment>
                  ) : (
                    <Attendance eventId={this.state.eventId} />
                  )}
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(event));
