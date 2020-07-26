import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = {
  paper: {
    padding: 20,
  },
};

class Profile extends Component {
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
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <Typography variant="h5">{name}</Typography>
          <Typography>{studentCard}</Typography>
          <Typography>{ccaParticipated}</Typography>
          <Typography>
            {cca}
            {tokenHeader}
          </Typography>
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
