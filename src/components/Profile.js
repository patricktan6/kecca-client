import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Collapse,
  List,
  ListItem,
  Paper,
  Typography,
  Card,
  CardActions,
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import transitions from "@material-ui/core/styles/transitions";

const styles = {
  paper: {
    padding: 20,
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
  text: {
    textAlign: "center",
  },
};

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        authenticated,
        loading,
        name,
        studentCard,
        ccaParticipated,
        adminStatus: { cca, tokenHeader },
      },
    } = this.props;
    const handleClick = () => {
      this.setState({ collapse: !collapse });
    };
    const { collapse } = this.state;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <Typography variant="h5">{name}</Typography>
          <Typography>{studentCard}</Typography>
          <Typography>
            {cca}
            {tokenHeader}
          </Typography>
          <Card>
          <CardActions>
            <Typography variant="button" className={classes.text} >CCAs Participated</Typography>
            <IconButton
              className={!collapse ? classes.expand : classes.expandOpen}
              onClick={handleClick}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
              <Paper>
                {loading ? (
                  <Typography variant="body2">Loading...</Typography>
                ) : ccaParticipated ? (
                  <List>
                    {ccaParticipated.map((cca) => (
                      <ListItem key={cca}>{cca}</ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2">No Absentees</Typography>
                )}
              </Paper>
            </Collapse>
          </Card>
        </Paper>
      ) : (
        <Redirect to="/login" />
      )
    ) : (
      <p>Loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
