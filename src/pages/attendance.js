import React, { Component, Fragment } from 'react';
import axios from 'axios';

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
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

class Attendance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attendees:[],
            members: []
        };
    }

    componentDidMount() {
        axios
            .get("/members")
            .then((res) => {
                this.setState({
                    members: res.data
                })
            })
            .catch((err) => console.log(err));            
    }

    // nothing happens
    handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post(`/event/${this.props.eventId}/attendance`, this.state.attendees)
          .catch((err) => console.log(err));
    }

    handleCheck(e,x) {
        this.setState(state => ({
        attendees: state.attendees.includes(x)
            ? state.attendees.filter(c => c !== x)
            : [...state.attendees, x]
        }));
    }

    render() {
        const {
            classes,
            UI: { loading },
        } = this.props; 

        return (
            <Fragment>
            <form noValidate onSubmit={this.handleSubmit} >
                <List dense >
                {this.state.members.map((stunum) => {
                    const labelId = `${stunum}`;
                    return (
                    <ListItem key={stunum} button>
                        <ListItemText id={labelId} primary={`${stunum}`} />
                        <ListItemSecondaryAction>
                        <Checkbox
                            edge="end"
                            label={`${stunum}`}
                            value={`${stunum}`}
                            onChange={e => this.handleCheck(e, stunum)}
                            checked={this.state.attendees.includes(stunum)}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                        </ListItemSecondaryAction>
                    </ListItem>
                    );
                })}
                </List>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
                onClick={this.handleSubmit}
                >
                Mark Attendance
                {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                )}
                </Button>
            </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(Attendance));
